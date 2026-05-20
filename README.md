# 520 纪念网站

这是一个纯静态网站，可以直接部署到 Vercel、Netlify、GitHub Pages 或任意静态服务器。

## 两个入口

- `gate.html`：适合微信发送的解密入口，密码是 `1214`。
- `index.html`：直接展示纪念页面，不需要解密。

## 后续添加照片

1. 把真实照片放到 `assets/photos/` 目录，例如 `assets/photos/beach.jpg`。
2. 打开 `data/photos.js`，按下面格式追加一项：

```js
{
  src: "assets/photos/beach.jpg",
  date: "2026.06.01",
  title: "海边的一天",
  text: "这里写这张照片背后的故事。",
  alt: "我们在海边的合照"
}
```

## 本地预览

在项目目录执行：

```bash
python3 -m http.server 5173
```

然后打开：

- 解密入口：http://localhost:5173/gate.html
- 直接展示：http://localhost:5173/index.html
