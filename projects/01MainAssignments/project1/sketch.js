let constellation = []; // Array to store star objects
let boxes = [];
let n; // Number of stars
let d; // Variable to store distance between stars

function setup() {
	createCanvas(windowWidth, windowHeight);
	pixelDensity(1);
	n = 800; // Number of stars

	// Create the first box and add it to the boxes array
	//F
	boxes.push(new Box(214, 232, 240, 92));
	boxes.push(new Box(214, 418, 212, 84));
	boxes.push(new Box(122, 232, 110, 445));

	//U
	boxes.push(new Box(553, 232, 110, 445));
	boxes.push(new Box(829, 232, 110, 445));
	boxes.push(new Box(663, 590, 166, 87));

	//S
	boxes.push(new Box(1055, 232, 356, 92));
	boxes.push(new Box(1055, 404, 382, 90));
	boxes.push(new Box(1055, 324, 110, 80));
	boxes.push(new Box(1327, 494, 110, 92));
	boxes.push(new Box(1073, 586, 364, 90));

	//E
	boxes.push(new Box(1665, 232, 225, 92));
	boxes.push(new Box(1665, 406, 204, 84));
	boxes.push(new Box(1665, 585, 225, 92));
	boxes.push(new Box(1555, 232, 110, 445));

	// Generate stars
	for (let i = 0; i < n; i++) {
		let collision = false;
		// Create a new star at a random position
		let newStar = new Star(random(width), random(height));
		constellation.push(newStar);

		// If the new star is generated inside any box, generate it at a new random spot inside the canvas
		do {
			collision = false;
			// Check for collision with each box
			for (let j = 0; j < boxes.length; j++) {
				if (boxes[j].checkCollision(newStar)) {
					collision = true;
				}
			}
			if (collision) {
				newStar.loc.x = random(width);
				newStar.loc.y = random(height);
			}
		} while (collision);

		strokeWeight(0.75);
		stroke('#39BFA7');
	}
}

function draw() {
	background('#081B26');

	// Update and display each star in the constellation
	for (let i = 0; i < constellation.length; i++) {
		constellation[i].update();

		// Connect stars that are close together with lines
		for (let j = 0; j < constellation.length; j++) {
			if (i > j) {
				// Calculate distance between two stars
				d = constellation[i].loc.dist(constellation[j].loc);
				// If distance is less than a threshold, draw a line between them
				if (d <= windowHeight / 10) {
					line(
						constellation[i].loc.x,
						constellation[i].loc.y,
						constellation[j].loc.x,
						constellation[j].loc.y
					);
				}
			}
		}
	}
}