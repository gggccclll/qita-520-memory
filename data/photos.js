window.LOVE_PHOTOS = Array.from({ length: 70 }, (_, index) => {
  const number = String(index + 1).padStart(3, "0");

  return {
    src: `assets/gallery/photo-${number}.jpg`,
    date: "我们的记忆",
    title: `第 ${index + 1} 张照片`,
    text: "这一刻被放进我们的纪念馆里，之后可以慢慢把每张照片的故事补上。",
    alt: `我们的第 ${index + 1} 张照片`,
  };
});
