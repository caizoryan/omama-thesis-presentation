// x---------------------x
// -----------------------
// Imports
// -----------------------
// x---------------------x
//
import { eff_on, html, render, sig } from "./solid_monke/solid_monke"
import QrScanner from 'qr-scanner';
import { Q5 as p5 } from "./q5/q5.js"

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

let current = ""

let texture = "./p4.mp4"
let texture_loaded

// let flash_timeout = 1500
// let flash_counter = 0
// let flash = null
//
// let flash_bg = "yellow"
// let flash_text = "blue"

let videos = {
	"video_1": "./p1.mp4",
	"video_2": "./p2.mp4",
	"video_3": "./p3.mp4",
	"video_4": "./p4.mp4",
	"video_5": "./p5.mp4",
	"video_6": "./p6.mp4",
	"video_7": "./p7.mp4",
	"video_8": "./p8.mp4",
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
			QrScanner.scanImage(capture, { returnDetailedScanResult: true })
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
		let load = () => {
			texture_loaded = p.createVideo(texture)
			texture_loaded.autoplay = true
			texture_loaded.muted = true
			texture_loaded.loop = true;
			texture_loaded.hide()
		}
		load()

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
		p.background(255, 0, 255);
		p.fill(255, 150, 0);
		p.textSize(12);

		draw_webcam(p)
		draw_video(p)
		//draw_texture(p)

		// draw pixel grid
		p.fill(0);
	}

}

const set_num = (num) => {
	let v = Object.keys(videos)[num - 1]
	console.log(v)
	if (v) current = v
}

document.onkeydown = e => {
	if (e.key == "c") current = ""
	if (e.key == "1") set_num(1)
	if (e.key == "2") set_num(2)
	if (e.key == "3") set_num(3)
	if (e.key == "4") set_num(4)
	if (e.key == "5") set_num(5)
	if (e.key == "6") set_num(6)
	if (e.key == "7") set_num(7)
	if (e.key == "8") set_num(8)

	else console.log(e)

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

function draw_texture(p) {
	p.blendMode(p.MULTIPLY)
	let video = texture_loaded
	p.image(video, 0, 0, p.width, p.height);
	p.blendMode(p.BLEND)
}

function draw_video(p) {
	p.blendMode("screen")
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
	p.blendMode(p.BLEND)
}

function draw_webcam(p5) {
	if (capturing) {
		p5.image(capture, 0, 0, c_width, c_height);
	}
}

new p5(sketch, document.getElementById('p5')!);

