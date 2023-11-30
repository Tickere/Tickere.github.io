class Coin {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.width = w;
      this.height = h;
      this.dragging = false;
      this.targetX = x;
      this.targetY = y;
    }
  
    // Check if a point (px, py) is inside the coin
    contains(px, py) {
      const {x,y,width,height} = this;
      return px > x - width / 2 && px < x + width / 2 && py > y - height / 2 && py < y + height / 2;
    }
    
   // Update the target position of the coin
    update(px, py) {
      this.targetX = px;
      this.targetY = py;
    }
  
    // Set the target position for the coin's return
    setTargetPosition(tx, ty) {
      this.targetX = tx;
      this.targetY = ty;
    }
  
    // Update the position of the coin, considering dragging and return
    updatePosition() {
      if (this.dragging) {
        this.x = mouseX;
        this.y = mouseY;
      } else {
        this.x = lerp(this.x, this.targetX, lerpSpeed);
        this.y = lerp(this.y, this.targetY, lerpSpeed);
      }
    }
  
    display() {
      image(coinImage, this.x - 55, this.y - 55, this.width, this.height);
    }
  }