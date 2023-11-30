let coin;
let coinImage;
const initialCoinPos = {x: 800,y: 800,
};
const lerpSpeed = 0.05; // Adjust the speed of the circle returning to its orginal position
let scratch = []; // Array to store ellipse positions and frame counters

function preload() {
  font = loadFont('Assets/Font/Orbitron-Bold.otf');
  coinImage = loadImage('Assets/Images/coin_pink_white.png');
}

function setup() {
  createCanvas(1000, 1000);
  textFont(font);
  coin = new Coin(initialCoinPos.x, initialCoinPos.y, 140, 140);
  clock = new Clock(width / 2, height / 2 + 75);
}

function draw() {
  background('#181717');

  textAlign(CENTER, CENTER);
  textSize(140);
  fill('#FFFFFF');
  text('USE THE', width / 2, 100);
  text('COIN TO', width / 2, 220);
  text('SCRATCH', width / 2, 340);
  textSize(48);
  text('Coin', 815, 880);

  fill('#FD375C');
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2 + 100, 900, 250, 40);

  // Draw scratches behind the clock
  for (let i = scratch.length - 1; i >= 0; i--) {
    const scratchData = scratch[i];
    fill('#181717');
    noStroke();
    ellipse(scratchData.x, scratchData.y, 40, 40);
    scratchData.frames--; // Frame counter for each ellipse
    // Remove the ellipse from the array if the frame counter reaches 0
    if (scratchData.frames <= 0) {
      scratch.splice(i, 1);
    }
  }
  
  clock.display();
  coin.updatePosition(); // Update coin position, considering dragging and return
  coin.display();
}

function mousePressed() {
  if (coin.contains(mouseX, mouseY)) {
    coin.dragging = true;
  }
}

function mouseReleased() {
  coin.dragging = false;
  coin.setTargetPosition(initialCoinPos.x, initialCoinPos.y);
}

function mouseDragged() {
  if (coin.dragging) {
    coin.update(mouseX, mouseY);

    // Check if the coin is over the rectangle and add scratches if true
    if (
      mouseX > width / 2 - 450 &&
      mouseX < width / 2 + 450 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 + 225
    ) {

      scratch.push({
        x: mouseX,
        y: mouseY,
        frames: 600, // Scratches disappear after 600 frames
      });
    }
  }
}