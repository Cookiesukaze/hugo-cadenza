---
title: "数据库基础"
date: 2023-02-10
tags: ["数据库", "后端", "SQL"]
categories: ["programming", "backend", "database"]
---

# 数据库基础

数据库是有组织地存储和管理数据的系统。在现代应用程序开发中，数据库扮演着至关重要的角色。

## 数据库类型

主要的数据库类型包括：

### 关系型数据库

关系型数据库基于关系模型，使用表格存储数据：

- MySQL
- PostgreSQL
- SQLite
- Oracle
- SQL Server

### NoSQL数据库

NoSQL数据库不使用传统的表格模型：

- 文档数据库（MongoDB）
- 键值存储（Redis）
- 列存储（Cassandra）
- 图数据库（Neo4j）

## SQL基础

SQL（结构化查询语言）是用于管理关系型数据库的标准语言。

### 创建表

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 插入数据

```sql
INSERT INTO users (id, username, email)
VALUES (1, 'johndoe', 'john@example.com');
```

### 查询数据

```sql
-- 查询所有用户
SELECT * FROM users;

-- 条件查询
SELECT username, email FROM users WHERE id = 1;
```

### 更新数据

```sql
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 1;
```

### 删除数据

```sql
DELETE FROM users WHERE id = 1;
```

## 数据库设计原则

### 规范化

规范化是一种减少数据冗余和提高数据完整性的过程：

- 第一范式（1NF）：每个表格单元格都应该包含单一值
- 第二范式（2NF）：满足1NF，并且所有非主键属性完全依赖于主键
- 第三范式（3NF）：满足2NF，并且所有非主键属性都不传递依赖于主键

### 索引

索引用于提高数据库查询性能：

```sql
-- 创建索引
CREATE INDEX idx_username ON users(username);
```

### 事务

事务是一组操作，要么全部成功，要么全部失败：

```sql
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

## 数据库连接

不同编程语言连接数据库的示例：

### Python (使用SQLite)

```python
import sqlite3

# 连接到数据库
conn = sqlite3.connect('example.db')
cursor = conn.cursor()

# 执行查询
cursor.execute('SELECT * FROM users')
users = cursor.fetchall()

# 关闭连接
conn.close()
```

### Node.js (使用MySQL)

```javascript
const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'mydb'
});

// 连接数据库
connection.connect();

// 执行查询
connection.query('SELECT * FROM users', (error, results) => {
  if (error) throw error;
  console.log(results);
});

// 关闭连接
connection.end();
```

## 总结

数据库是现代应用程序的核心组件。理解数据库基础知识对于后端开发至关重要。通过本文的介绍，你应该对数据库的基本概念和操作有了初步了解。
