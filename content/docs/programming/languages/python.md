---
title: "Python 基础"
weight: 10
---

# Python 基础

Python 是一种易于学习、功能强大的编程语言。它具有高效的高级数据结构和简单但有效的面向对象编程方法。

## Python 特点

- 简洁清晰的语法
- 丰富的标准库
- 跨平台兼容性
- 强大的社区支持

## 基本语法

### 变量和数据类型

```python
# 变量赋值
x = 10
name = "Python"
is_awesome = True

# 数据类型
print(type(x))        # <class 'int'>
print(type(name))     # <class 'str'>
print(type(is_awesome))  # <class 'bool'>
```

### 条件语句

```python
age = 18

if age < 18:
    print("未成年")
elif age == 18:
    print("刚好成年")
else:
    print("成年人")
```

### 循环

```python
# for 循环
for i in range(5):
    print(i)  # 输出 0, 1, 2, 3, 4

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1
```

## 函数

```python
def greet(name):
    """简单的问候函数"""
    return f"你好，{name}！"

# 调用函数
message = greet("世界")
print(message)  # 输出：你好，世界！
```

## 总结

Python 是一门非常适合初学者的语言，同时也被专业开发者广泛使用。通过本文的介绍，你应该对 Python 的基本语法有了初步了解。
