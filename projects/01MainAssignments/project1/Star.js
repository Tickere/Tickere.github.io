class Star {
	constructor(x, y) {
		this.loc = createVector(x, y);
		this.speed = p5.Vector.random2D().mult(random(0.05, 0.2));
	}

	// Update star position and handle collisions
	update() {
		let damping = 0.05; // lower values calm down movement)
		this.speed.mult(damping);

		// Movement influenced by the mouse if the star is near the mouse
		let maxPullDistance = 150; // Adjust the maximum distance for the pull effect
		let distanceToMouse = dist(this.loc.x, this.loc.y, mouseX, mouseY);

		if (distanceToMouse < maxPullDistance) {
			let mouseVector = createVector(mouseX, mouseY);
			let direction = p5.Vector.sub(mouseVector, this.loc);
			direction.normalize().mult(0.005); // Adjust the strength of the pull
			this.speed.add(direction);
		}

		// Speed is done according to the distance between loc and the mouse:
		let m = constrain(map(distanceToMouse, 0, width, 1, 0.05), 0.05, );
		this.speed.normalize().mult(m);

		// Handle box collisions
		for (let i = 0; i < boxes.length; i++) {
			if (
				this.loc.x > boxes[i].loc.x &&
				this.loc.x < boxes[i].loc.x + boxes[i].w &&
				this.loc.y > boxes[i].loc.y &&
				this.loc.y < boxes[i].loc.y + boxes[i].h
			) { this.speed.mult(-1); // Bounce off the box
			}
		}

		// Handle canvas boundary collisions
		if (this.loc.x < 0 || this.loc.x > width) {
			this.loc.x = width - this.loc.x;
		}
		if (this.loc.y < 0 || this.loc.y > height) {
			this.loc.y = height - this.loc.y;
		}

		this.loc = this.loc.add(this.speed);
	}
}