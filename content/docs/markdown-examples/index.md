---
title: "Markdown 示例"
date: 2023-03-20
tags: ["markdown", "examples", "formatting"]
featured: true
---

# Markdown 示例

这个页面展示了各种 Markdown 格式和特殊功能的示例。

## 折叠式内容块

以下是折叠式内容块的示例，支持多种颜色选项：

{{< details title="安装为 Git 子模块" color="red" >}}
1. 克隆仓库到您的 Git 项目中：
   ```bash
   git submodule add https://github.com/username/theme.git themes/themename
   ```
2. 初始化和更新子模块：
   ```bash
   git submodule init
   git submodule update
   ```
{{< /details >}}

{{< details title="安装为 Hugo 模块" color="blue" >}}
1. 初始化 Hugo 模块系统：
   ```bash
   hugo mod init github.com/username/yourproject
   ```
2. 在 `config.toml` 中添加主题：
   ```toml
   [module]
     [[module.imports]]
       path = "github.com/username/theme"
   ```
3. 运行 Hugo 以下载模块：
   ```bash
   hugo
   ```
{{< /details >}}

{{< details title="手动安装" color="green" open=true >}}
1. 下载最新版本的主题源代码。[下载链接](https://github.com/username/theme/releases)
2. 解压缩归档文件，将文件夹重命名为 `themename` 并移动到 `themes/` 目录中，位于您的 Hugo 项目的根文件夹中。
3. 继续设置[主题配置文件](https://example.com/docs/configuration)。
{{< /details >}}

## 更多颜色选项

折叠块支持多种颜色选项，您可以通过 `color` 参数指定：

{{< details title="紫色示例" color="purple" >}}
这是一个紫色边框的折叠块。
{{< /details >}}

{{< details title="橙色示例" color="orange" >}}
这是一个橙色边框的折叠块。
{{< /details >}}

{{< details title="青色示例" color="teal" >}}
这是一个青色边框的折叠块。
{{< /details >}}

{{< details title="黄色示例" color="yellow" >}}
这是一个黄色边框的折叠块。
{{< /details >}}

{{< details title="粉色示例" color="pink" >}}
这是一个粉色边框的折叠块。
{{< /details >}}

{{< details title="灰色示例" color="gray" >}}
这是一个灰色边框的折叠块。
{{< /details >}}

## 基本 Markdown 格式

### 文本格式

*斜体文本* 和 **粗体文本**

~~删除线文本~~

### 列表

无序列表：
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

有序列表：
1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项

### 链接和图片

[Hugo 官网](https://gohugo.io/)

![Hugo Logo](https://d33wubrfki0l68.cloudfront.net/c38c7334cc3f23585738e40334284fddcaf03d5e/2e17c/images/hugo-logo-wide.svg)

### 引用

> 这是一个引用。
>
> 引用可以有多个段落。

### 代码

内联代码：`var example = "hello world";`

代码块：
```javascript
function example() {
  console.log("Hello, world!");
  return true;
}
```

### 表格

| 名称 | 描述 | 版本 |
|------|------|------|
| Hugo | 静态网站生成器 | v0.92.0 |
| Go | 编程语言 | v1.17 |
| Markdown | 标记语言 | - |

## 高级功能

### 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个未完成任务

### 脚注

这是一个带有脚注的文本[^1]。

[^1]: 这是脚注的内容。

### 定义列表

Hugo
: 一个快速且现代的静态网站生成器，用 Go 语言编写。

Markdown
: 一种轻量级标记语言，可以使用易读易写的纯文本格式编写文档。
