class Box {
	constructor(x, y, w, h) {
		x = x/2000 * width ;
		y = y/1000 * height ;
		this.loc = createVector(x, y);
		this.w = w/2000 * width ;
		this.h = h/1000 * height ;
	}

	// Check collision with a star
	checkCollision(star) {
		// Rectangle collision detection
		if (
			star.loc.x > this.loc.x &&
			star.loc.x < this.loc.x + this.w &&
			star.loc.y > this.loc.y &&
			star.loc.y < this.loc.y + this.h
		) {
			return true;
		}
		return false;
	}

	display() {
		fill(255, 0, 0);
		rect(this.loc.x, this.loc.y, this.w, this.h);
	}
}