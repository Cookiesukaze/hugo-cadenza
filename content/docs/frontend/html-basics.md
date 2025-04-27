---
title: "HTML 基础"
date: 2023-02-05
tags: ["HTML", "前端", "Web开发"]
categories: ["programming", "frontend", "html"]
---

# HTML 基础

HTML（超文本标记语言）是创建网页的标准标记语言。通过HTML，你可以创建自己的网站。

## HTML 文档结构

一个基本的HTML文档结构如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>页面标题</title>
</head>
<body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
</body>
</html>
```

## HTML 元素

HTML 元素由开始标签、内容和结束标签组成：

```html
<tagname>内容</tagname>
```

常见的HTML元素包括：

### 标题

HTML提供了六级标题，从`<h1>`到`<h6>`：

```html
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
```

### 段落

段落使用`<p>`标签定义：

```html
<p>这是一个段落。</p>
```

### 链接

链接使用`<a>`标签定义：

```html
<a href="https://www.example.com">这是一个链接</a>
```

### 图片

图片使用`<img>`标签插入：

```html
<img src="image.jpg" alt="图片描述" width="500" height="300">
```

## HTML 属性

HTML属性提供了有关HTML元素的附加信息：

- 属性总是在开始标签中指定
- 属性通常以名称/值对的形式出现，如：name="value"

例如，链接的地址在`href`属性中指定：

```html
<a href="https://www.example.com">这是一个链接</a>
```

## HTML 表单

HTML表单用于收集用户输入：

```html
<form action="/submit-form" method="post">
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name"><br><br>

    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email"><br><br>

    <input type="submit" value="提交">
</form>
```

## HTML5 新特性

HTML5引入了许多新元素和属性，如：

- 语义化元素：`<header>`, `<footer>`, `<article>`, `<section>`
- 表单控件：`<datalist>`, `<output>`
- 图形元素：`<canvas>`, `<svg>`
- 多媒体元素：`<audio>`, `<video>`

## 总结

HTML是网页开发的基础，掌握HTML对于前端开发至关重要。通过本文的介绍，你应该对HTML的基本结构和常用元素有了初步了解。
