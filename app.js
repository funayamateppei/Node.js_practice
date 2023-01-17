import express from "express";

const app = express();
const port = 3001;

// Hello World
app.get("/", (req, res) => {
  // res.send("Hello Node.js!");
  res.json({
    uri: "/",
    message: "Hello Node.js!!!!"
  })
});

// おみくじの処理
app.get("/omikuji", (req, res) => {
  const omikuji = ["大吉", "吉", "中吉", "小吉", "末吉", "凶"];
  const min = 0;
  const max = omikuji.length - 1;
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  res.json({
    uri: "/omikuji",
    message: omikuji[index]
  })
});

// じゃんけんの処理
app.get("/janken", (req, res) => {
  res.json({
    uri: "/",
    message: "janken!!!!"
  })
});

// サーバーの立ち上げ
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
