---
title: Github配置SSH密钥
createDate: 2025-03-09
updateDate: 2025-03-09
tags: ssh
excerpt: Github配置SSH密钥
---

# Windows
## 1 打开cmd输入
```sh
ssh-keygen -t rsa -b 4096 -C "你的邮箱地址"
```

## 2 找到密钥生成位置

默认位置：C:\Users\用户名\\.ssh

`id_rsa: 私钥`

`id_rsa.pub: 公钥`

## 3 github添加密钥
1. 复制公钥内容
2. 打开github 设置 > SSH and GPG Keys > New SSH key


# Linux
不知道，我不用linux