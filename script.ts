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
let capturing = false

// ---------------------
// DOM Element
// ---------------------
let canvas = document.getElementById('p5')
let c_width = canvas?.clientWidth
let c_height = canvas?.clientHeight

let current = "video_1"

// let flash_timeout = 1500
// let flash_counter = 0
// let flash = null
//
// let flash_bg = "yellow"
// let flash_text = "blue"

let videos = {
	"video_1": "./test.mp4",
	"video_2": "./test.mp4"
}

let randoms = Array(50).fill(0).map((_, i) => ({ x: Math.random(), y: Math.random() }))

let video_loaded = {}

let sketch = (p: p5) => {
	function qr_code_init() {
		let options = Object.keys(videos)
		setInterval(() => {
			console.log('truing')
			let canvas = document.querySelector('canvas');
			if (!canvas) return;
			QrScanner.scanImage(canvas, { returnDetailedScanResult: true })
				.then(result => {
					let text = result.data
					console.log(text)

					if (text !== current) {
						if (options.includes(text)) {
							current = text
							if (video_loaded[current]) {
								video_loaded[current].currentTime = 0
								video_loaded[current].play()
							}
						}
					}
				})
				.catch(error => { });
		}, 500)
	}


	p.preload = () => {
		// p5.textFont(font)
		Object.entries(videos).forEach(([key, spread]) => {
			let vid = p.createVideo(spread);
			vid.autoplay = vid.muted = vid.loop = true;
			vid.hide()
			video_loaded[key] = vid
		})
	}

	p.setup = () => {
		p.createCanvas(c_width, c_height);
		// p5.frameRate(3);
		p.textFont("monospace")


		if (capturing) {
			//@ts-ignore
			capture = p.createCapture(p.VIDEO);
			capture.size(c_width, c_height);
			capture.hide();
			qr_code_init()
		}

	}

	p.draw = () => {
		p.background(255, 0, 0);
		p.fill(255, 150, 0);
		// p5.ellipse(200, 200, 500, 500);
		p.textSize(12);

		draw_webcam(p)
		draw_video(p)

		// draw pixel grid
		p.fill(0);
	}

}

document.onkeydown = e => {
	if (e.key == "c") current = ""
}

function draw_flash() {
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
	//
}

function draw_video(p) {
	if (video_loaded[current]) {
		let video = video_loaded[current]
		let w = video.width
		let h = video.height
		let ratio = (p.width / video.width) * .65
		let w_r = w * ratio
		let h_r = h * ratio
		let w3 = (p.width - w_r)
		let h3 = (p.height - h_r)
		let index = Object.values(video_loaded).findIndex(e => e == video)
		p.image(video, randoms[index].x * w3, randoms[index].y * h3, w_r, h_r);
	}
}

function draw_webcam(p5) {
	if (capturing) {
		p5.image(capture, 0, 0, c_width, c_height);
	}
}

new p5(sketch, document.getElementById('p5')!);

