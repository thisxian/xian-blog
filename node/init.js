import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路径配置
const articlesDir = path.join(__dirname, '../public/data/article');
const outputPath = path.join(__dirname, '../public/data/link.json');

// 读取并处理markdown文件
function processMarkdownFiles() {
  try {
    // 获取所有.md文件
    const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));
    const result = [];

    for (const file of files) {
      const filePath = path.join(articlesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      // 使用正则表达式匹配Front Matter
      const frontMatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);


      if (frontMatterMatch) {
        try {
          // 解析YAML为对象
          const frontMatter = yaml.load(frontMatterMatch[1]);
          result.push(frontMatter);
        } catch (e) {
          console.error(`解析YAML失败：${file}`, e);
        }
      } else {
        console.warn(`未找到Front Matter：${file}`);
      }
    }

    
    // 写入JSON文件
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log('数据已成功写入:', outputPath);

  } catch (error) {
    console.error('处理过程中发生错误:', error);
  }
}

processMarkdownFiles();