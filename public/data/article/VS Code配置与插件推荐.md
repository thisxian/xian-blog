---
title: VS Code配置与插件推荐
createDate: 2025-03-17
updateDate: 2025-03-17
tags: 配置
excerpt: VS Code使用必备
---

# 配置
```json
{
    // 文字设置
    "editor": {
        "fontFamily": "Cascadia Code", // 字体
        "fontLigatures": true, // 允许字体连字（= =取消空格间隙）
        "tokenColorCustomizations": { // 字体颜色
            "numbers": "#42dc34", // 数字
            // "comments": "#7ea790",  // 注释
            // "keywords": "#ff8181",  // 关键字
            // "variables": "#f9ac6e", // 变量名  
            // "strings": "#019650",   // 字符串
            // "functions": "#4bc3ff", // 函数名
        },
    },
    // 失去焦点自动保存
    "files.autoSave": "onFocusChange",
    // 显示代码层级
    "editor.guides.bracketPairs": true,
    // 默认图标主题
    "workbench.iconTheme": "vscode-icons",
    // 默认json格式化工具（允许json注释）
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    // --------------------Web--------------------
    // tab自动补全标签
    "emmet.triggerExpansionOnTab": true,
    // 标签自动同步（修改左侧标签名，右侧自动同步）
    "editor.linkedEditing": true,
}
```

# 插件推荐
## 通用
### Code Translate
描述：滑词翻译

### Draw.io Integration
描述：流程图绘制

### Image preview
描述：代码左侧以icon的形式预览图片

### vscode-icons
描述：好看的文件图标

## Web
### Vue - Official
描述：提供vue语法支持和代码提示