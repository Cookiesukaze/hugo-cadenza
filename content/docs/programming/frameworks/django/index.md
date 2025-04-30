---
title: "Django 入门"
weight: 10
---

# Django 入门

Django 是一个高级的 Python Web 框架，它鼓励快速开发和简洁、实用的设计。

## Django 特点

- 快速开发
- 安全可靠
- 可扩展性强
- 完善的文档

## 安装 Django

使用 pip 安装 Django：

```bash
pip install django
```

## 创建项目

```bash
django-admin startproject mysite
```

## 创建应用

```bash
cd mysite
python manage.py startapp blog
```

## 定义模型

```python
# blog/models.py
from django.db import models
from django.utils import timezone

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title
```

## 创建视图

```python
# blog/views.py
from django.shortcuts import render
from .models import Post

def post_list(request):
    posts = Post.objects.all().order_by('-published_date')
    return render(request, 'blog/post_list.html', {'posts': posts})
```

## 配置 URL

```python
# blog/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
]
```

## 创建模板

```html
<!-- blog/templates/blog/post_list.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Blog</title>
</head>
<body>
    <h1>Blog Posts</h1>
    {% for post in posts %}
        <div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <p>Published: {{ post.published_date }}</p>
        </div>
    {% endfor %}
</body>
</html>
```

## 运行服务器

```bash
python manage.py runserver
```

## 总结

Django 是一个功能强大的 Web 框架，适合快速开发各种 Web 应用。通过本文的介绍，你应该对 Django 的基本使用有了初步了解。
