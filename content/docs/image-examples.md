---
title: "图片展示示例"
date: 2023-03-25
tags: ["images", "examples", "gallery"]
featured: true
---

# 图片展示示例

这个页面展示了美化后的图片显示功能，包括可折叠的图片和图片集。

## 单张图片折叠

以下是单张图片折叠的示例：

{{< image-fold title="Hugo Logo" src="https://d33wubrfki0l68.cloudfront.net/c38c7334cc3f23585738e40334284fddcaf03d5e/2e17c/images/hugo-logo-wide.svg" alt="Hugo Logo" caption="Hugo 静态网站生成器的标志" >}}
这是 Hugo 的官方标志。Hugo 是一个用 Go 语言编写的静态网站生成器，以其速度快和灵活性而闻名。
{{< /image-fold >}}

{{< image-fold title="Go Gopher" src="https://go.dev/blog/gopher/header.jpg" alt="Go Gopher" caption="Go 语言的吉祥物 Gopher" open=true >}}
这是 Go 语言的吉祥物 Gopher。Go 是一种开源编程语言，旨在提高程序员的生产力。

- Go 由 Google 开发
- 它是一种静态类型的编译语言
- 它的语法类似于 C，但具有垃圾收集、内存安全等特性
{{< /image-fold >}}

## 图片集折叠

以下是图片集折叠的示例：

{{< image-gallery title="编程语言标志集" >}}
  {{< gallery-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png" caption="Python" >}}
  {{< gallery-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" caption="JavaScript" >}}
  {{< gallery-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png" caption="C++" >}}
  {{< gallery-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1200px-Ruby_logo.svg.png" caption="Ruby" >}}
  {{< gallery-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" caption="TypeScript" >}}
  {{< gallery-image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/C_Sharp_Logo.svg/1200px-C_Sharp_Logo.svg.png" caption="C#" >}}
{{< /image-gallery >}}

{{< image-gallery title="自然风景" open=true >}}
  {{< gallery-image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" caption="山脉" >}}
  {{< gallery-image src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" caption="海洋" >}}
  {{< gallery-image src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" caption="森林" >}}
  {{< gallery-image src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" caption="草原" >}}
{{< /image-gallery >}}

## 使用说明

### 单张图片折叠

使用 `image-fold` shortcode 来创建可折叠的单张图片：

```markdown
{{</* image-fold title="图片标题" src="图片URL" alt="替代文本" caption="图片说明" */>}}
可选的图片描述文本（支持Markdown格式）
{{</* /image-fold */>}}
```

如果希望默认展开，可以添加 `open=true` 参数。

### 图片集折叠

使用 `image-gallery` 和 `gallery-image` shortcodes 来创建可折叠的图片集：

```markdown
{{</* image-gallery title="图片集标题" */>}}
  {{</* gallery-image src="图片1URL" caption="图片1说明" */>}}
  {{</* gallery-image src="图片2URL" caption="图片2说明" */>}}
  {{</* gallery-image src="图片3URL" caption="图片3说明" */>}}
{{</* /image-gallery */>}}
```

同样，如果希望默认展开，可以添加 `open=true` 参数。

## 特点

1. **可折叠显示**：点击标题栏可以展开或折叠图片内容
2. **美观的样式**：图片带有圆角和阴影效果
3. **响应式设计**：在不同屏幕尺寸下自动调整布局
4. **图片说明**：支持添加图片说明文字
5. **点击放大**：点击图片可以在模态框中查看大图
6. **Markdown支持**：在图片描述中可以使用Markdown格式
