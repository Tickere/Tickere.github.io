class Clock {
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.fontSize = 164;
      this.textColor = '#FD375C';
    }
    
  // Display the current time
    display() {
      strokeCap(SQUARE);
      const d = new Date();
      const h = (d.getHours() % 12) || 12;
      const m = d.getMinutes();
      const s = d.getSeconds() + d.getMilliseconds() / 1000;
  
      noStroke();
      fill(this.textColor);
      textSize(this.fontSize);
      text(`${h}:${('00' + m).substr(-2)}:${('00' + parseInt(s)).substr(-2)}`, this.x, this.y);
    }
  }