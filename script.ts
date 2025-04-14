// x---------------------x
// -----------------------
// Imports
// -----------------------
// x---------------------x
//
import { eff_on, html, render, sig } from "./solid_monke/solid_monke"
import QrScanner from 'qr-scanner';
import { Q5 as p5 } from "./q5/q5.js"
import * as tone from "tone"

// x---------------------x
// -----------------------
// Model (Data) State
// -----------------------
// x---------------------x
//
let capture; // webcam capture
let capturing = true

// ---------------------
// DOM Element
// ---------------------
let canvas = document.getElementById('p5')
let c_width = canvas?.clientWidth
let c_height = canvas?.clientHeight

let current = "spread_0"

// let flash_timeout = 1500
// let flash_counter = 0
// let flash = null
//
// let flash_bg = "yellow"
// let flash_text = "blue"


let sketch = (p5: p5) => {
	// function draw_video() {
	// 	if (capturing) {
	// 		p5.image(capture, 0, 0, c_width, c_height);
	// 	}
	// }



	// function qr_code_init() {
	// 	let options = Object.keys(spreads)
	// 	setInterval(() => {
	// 		let canvas = document.querySelector('canvas');
	// 		if (!canvas) return;
	// 		QrScanner.scanImage(canvas, { returnDetailedScanResult: true })
	// 			.then(result => {
	// 				let text = result.data
	// 				console.log(text)
	//
	// 				if (text !== current) {
	// 					if (options.includes(text)) {
	// 						counter = 0
	// 						image_layer.clear()
	// 						current = text
	// 					}
	// 				}
	//
	// 			})
	// 			.catch(error => {
	// 			});
	// 	}, 500)
	// }


	p5.preload = () => {
		// p5.textFont(font)
		// Object.values(spreads).forEach((spread) => {
		// 	spread.forEach((fn) => {
		// 		if ("string" === typeof fn[0]
		// 			&& fn[0].includes("image")
		// 			&& "string" === typeof fn[1]) {
		// 			// @ts-ignore
		// 			let img = p5.loadImage(fn[1], () => { fn[1] = img })
		// 		}
		// 	})
		// })
	}

	p5.setup = () => {
		p5.createCanvas(c_width, c_height);
		// p5.frameRate(3);
		p5.textFont("monospace")


		// if (capturing) {
		// 	//@ts-ignore
		// 	capture = p5.createCapture(p5.VIDEO);
		// 	capture.size(c_width, c_height);
		// 	capture.hide();
		// 	qr_code_init()
		// }

	}

	p5.draw = () => {
		p5.background(255, 0, 0);
		p5.fill(255, 150, 0);
		// p5.ellipse(200, 200, 500, 500);
		p5.textSize(12);

		// draw base image
		// draw_video()

		// draw pixel grid
		p5.fill(0);
		p5.text("Value: " + val, 10, 30);
		p5.text("Counter: " + counter, 10, 50);


		// if ("string" == typeof flash) {
		// 	if (flash_counter < flash_timeout) {
		// 		p5.fill(flash_bg)
		// 		p5.rect(0, 0, p5.width, p5.height)
		// 		p5.fill(flash_text)
		// 		p5.textSize(80)
		// 		p5.textAlign(p5.CENTER, p5.CENTER)
		// 		p5.text(flash, p5.width / 2, p5.height / 2)
		// 		p5.textAlign(p5.LEFT, p5.TOP)
		// 		flash_counter += delta
		// 	}
		// 	else {
		// 		flash_counter = 0
		// 		flash = null
		// 	}
		// }
	}
}

new p5(sketch, document.getElementById('p5')!);

