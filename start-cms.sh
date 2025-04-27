#!/bin/bash

# 启动 Netlify CMS 代理服务器（确保使用端口 8081）
echo "启动 Netlify CMS 代理服务器..."
npx netlify-cms-proxy-server -p 8081 &
CMS_PID=$!

# 等待 CMS 代理服务器启动
sleep 2

# 启动 Hugo 服务器
echo "启动 Hugo 服务器..."
hugo server -D &
HUGO_PID=$!

# 捕获 CTRL+C 信号
trap "kill $CMS_PID $HUGO_PID; exit" INT

# 等待用户按下 CTRL+C
echo "CMS 已启动！"
echo "Decap CMS 代理服务器运行在: http://localhost:8081"
echo "Hugo 服务器运行在: http://localhost:1313"
echo "访问 http://localhost:1313/admin/ 来使用 Decap CMS"
echo "按 CTRL+C 停止服务器"
wait
