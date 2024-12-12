let img;

function preload() {
  img = loadImage('icon.png'); // 画像を読み込む
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(img, 0, 0, 400, 400); // 画像を描画
}
