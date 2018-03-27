var interface = function(p) {

	p.level = 1;

	p.cur = 0;

	p.buttons = []

	p.blocked = false

	p.done = true

	p.function = ['1', '5', '2', '6', '3', '7', 'b5/#11', 'b2/b9', '#5/b13', 'b3', 'b7', '4']

	p.active = ['1','3','6']

	p.note = 'C5'

	p.again = false

	p.start = true

	p.mode = 'learn'

	p.chords = [
	  ['C3', 'G3', 'E4'], 
	  ['F3', 'C3', 'A4'], 
	  ['A#2', 'F3', 'D4'], 
	  ['D#3', 'A#3', 'G4'], 
	  ['G#2', 'D#3', 'C4'],
	  ['C#3', 'G#3', 'F4'],
	  ['F#3', 'C#4', 'A#4'],
	  ['B2', 'F#3', 'D#4'],
	  ['E3', 'B3', 'G#4'],
	  ['A2', 'E3', 'C#4'],
	  ['D3', 'A3', 'F#4'],
	  ['G3', 'D4', 'B4']
	]

	p.preload = function() {
		p.piano = new Tone.Sampler({
			'A0' : 'A0.[mp3|ogg]',
			'C1' : 'C1.[mp3|ogg]',
			'D#1' : 'Ds1.[mp3|ogg]',
			'F#1' : 'Fs1.[mp3|ogg]',
			'A1' : 'A1.[mp3|ogg]',
			'C2' : 'C2.[mp3|ogg]',
			'D#2' : 'Ds2.[mp3|ogg]',
			'F#2' : 'Fs2.[mp3|ogg]',
			'A2' : 'A2.[mp3|ogg]',
			'C3' : 'C3.[mp3|ogg]',
			'D#3' : 'Ds3.[mp3|ogg]',
			'F#3' : 'Fs3.[mp3|ogg]',
			'A3' : 'A3.[mp3|ogg]',
			'C4' : 'C4.[mp3|ogg]',
			'D#4' : 'Ds4.[mp3|ogg]',
			'F#4' : 'Fs4.[mp3|ogg]',
			'A4' : 'A4.[mp3|ogg]',
			'C5' : 'C5.[mp3|ogg]',
			'D#5' : 'Ds5.[mp3|ogg]',
			'F#5' : 'Fs5.[mp3|ogg]',
			'A5' : 'A5.[mp3|ogg]',
			'C6' : 'C6.[mp3|ogg]',
			'D#6' : 'Ds6.[mp3|ogg]',
			'F#6' : 'Fs6.[mp3|ogg]',
			'A6' : 'A6.[mp3|ogg]',
			'C7' : 'C7.[mp3|ogg]',
			'D#7' : 'Ds7.[mp3|ogg]',
			'F#7' : 'Fs7.[mp3|ogg]',
			'A7' : 'A7.[mp3|ogg]',
			'C8' : 'C8.[mp3|ogg]'
		}, {
			'release' : 1,
			'baseUrl' : '../salamander/'
		}).toMaster()
	}

	p.setup = function() {
		p.createCanvas(500, 275);

		var but = new RectButton(100,200,50,50,p,'orange'); 
		but.clicked = function(){
			this.flash('green')
			p.piano.triggerAttack(p.note)
		}
		p.buttons.push(but);

		var but = new RectButton(225,200,50,50,p,'orange'); 
		but.clicked = function(){
			this.flash('green')
			for (var i = 0; i < 3; i++) p.piano.triggerAttack(p.chords[p.cur][i])
		}
		p.buttons.push(but);

		but = new RectButton(350,200,50,50,p,'orange'); 
		but.clicked = function(){
			this.flash('green')
			p.done = false
			p.again = false
			p.start = false
			randomizeHarmony()
			p.piano.triggerRelease()
			for (var i = 0; i < 3; i++) p.piano.triggerAttack(p.chords[p.cur][i])
			setTimeout(function(){p.piano.triggerAttack(p.note)}, 1500)
		}
		p.buttons.push(but);

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 4; j++) {
				but = new RectButton(180 + i * 60, 30 + j * 35, 25, 25, p, 'orange')

				if (i == 0 && j == 0) but.func = '1'
				else if (i == 1 && j == 0) but.func = 'b2/b9'
				else if (i == 2 && j == 0) but.func = '2'
				else if (i == 0 && j == 1) but.func = 'b3'
				else if (i == 1 && j == 1) but.func = '3'
				else if (i == 2 && j == 1) but.func = '4'
				else if (i == 0 && j == 2) but.func = 'b5/#11'
				else if (i == 1 && j == 2) but.func = '5'
				else if (i == 2 && j == 2) but.func = '#5/b13'
				else if (i == 0 && j == 3) but.func = '6'
				else if (i == 1 && j == 3) but.func = 'b7'
				else if (i == 2 && j == 3) but.func = '7'

				but.clicked = function(){
					this.flash('green')
					if (p.mode == 'learn') {
						p.piano.triggerRelease()
						console.log(p.chords[p.function.indexOf(this.func)])
						for (var i = 0; i < 3; i++) p.piano.triggerAttack(p.chords[p.function.indexOf(this.func)][i])
						setTimeout(function(){p.piano.triggerAttack(p.note)}, 1500)
					} else {
						checkInput(this.func)
					}
				}

				p.buttons.push(but)
			}
		}

		for (var i = 0; i < 12; i++) {
			but = new RectButton(475, 10 + i * 15, 10, 10, p, 'magenta')

			if (i == 0) but.func = '1'
			else if (i == 1) but.func = 'b2/b9'
			else if (i == 2) but.func = '2'
			else if (i == 3) but.func = 'b3'
			else if (i == 4) but.func = '3'
			else if (i == 5) but.func = '4'
			else if (i == 6) but.func = 'b5/#11'
			else if (i == 7) but.func = '5'
			else if (i == 8) but.func = '#5/b13'
			else if (i == 9) but.func = '6'
			else if (i == 10) but.func = 'b7'
			else if (i == 11) but.func = '7'

			but.clicked = function() {
				if (this.active) {
					this.active = false
					p.active.splice(p.active.indexOf(this.func), 1)
				}
				else {
					this.active = true
					p.active.push(this.func)
				}
			}

			but.active = false
			if (i == 0 || i == 4 || i == 9) but.active = true
			but.display = function() {
				if (this.active) p.fill(this.col)
				else p.fill('grey')
				p.strokeWeight(1);
				p.rect(this.x,this.y,this.width,this.height);
			}

			p.buttons.push(but)
		}

   		randomizeHarmony()
	}

	p.draw = function() {
		p.background(200)

		p.textSize(27)
		p.text('mode:',10,25)

		var c1, c2
		if (p.mode == 'learn') {
			c1 = p.color(255,255,0)
			c2 = p.color(255,255,0,50)
		}
		else {
			c1 = p.color(255,255,0,50)
			c2 = p.color(255,255,0)
		}
		p.fill(c1)
		p.text('learn',10,55)
		p.fill(c2)
		p.text('test', 80,55)

		if (p.mode == 'test') {

			if (i == 0 && j == 0) but.func = '1'
			else if (i == 1 && j == 0) but.func = 'b2/b9'
			else if (i == 2 && j == 0) but.func = '2'
			else if (i == 0 && j == 1) but.func = 'b3'
			else if (i == 1 && j == 1) but.func = '3'
			else if (i == 2 && j == 1) but.func = '4'
			else if (i == 0 && j == 2) but.func = 'b5/#11'
			else if (i == 1 && j == 2) but.func = '5'
			else if (i == 2 && j == 2) but.func = '#5/b13'
			else if (i == 0 && j == 3) but.func = '6'
			else if (i == 1 && j == 3) but.func = 'b7'
			else if (i == 2 && j == 3) but.func = '7'

			for (var i = 0; i < p.buttons.length; i++) {
				if (p.done && (i == 0 || i == 1 || (i > 2 && i < 15))) continue
				
				if (i == 3 && !p.buttons[15].active) continue
				else if (i == 4 && !p.buttons[18].active) continue
				else if (i == 5 && !p.buttons[21].active) continue
				else if (i == 6 && !p.buttons[24].active) continue
				else if (i == 7 && !p.buttons[16].active) continue
				else if (i == 8 && !p.buttons[19].active) continue
				else if (i == 9 && !p.buttons[22].active) continue
				else if (i == 10 && !p.buttons[25].active) continue
				else if (i == 11 && !p.buttons[17].active) continue
				else if (i == 12 && !p.buttons[20].active) continue
				else if (i == 13 && !p.buttons[23].active) continue
				else if (i == 14 && !p.buttons[26].active) continue


				p.buttons[i].display()
			}

			if (p.again) {
				p.fill('red')
				p.textSize(22)
				p.text('try again', 212, 188)
			}

			p.fill('grey')
			p.textSize(8)
			p.text('1', 465, 18)
			p.text('b2/b9', 450 ,33)
			p.text('2', 465 ,48)
			p.text('b3',460, 63)
			p.text('3',465, 78)
			p.text('4',465, 93)
			p.text('b5/#11',445, 108)
			p.text('5',465, 123)
			p.text('#5/b13',445, 138)
			p.text('6',465, 153)
			p.text('b7',460, 168)
			p.text('7',465, 183)

			p.fill('yellow')


			if (!p.done) {
				p.textSize(16);
				if (p.buttons[15].active) p.text('1', 188, 49)
				if (p.buttons[16].active) p.text('b2/b9', 233 ,49)
				if (p.buttons[17].active) p.text('2', 308 ,49)
				if (p.buttons[18].active) p.text('b3',184, 84)
				if (p.buttons[19].active) p.text('3',248, 84)
				if (p.buttons[20].active) p.text('4',308, 84)
				if (p.buttons[21].active) p.text('b5/#11',170, 119)
				if (p.buttons[22].active) p.text('5',248, 119)
				if (p.buttons[23].active) p.text('#5/b13',288, 119)
				if (p.buttons[24].active) p.text('6',188, 154)
				if (p.buttons[25].active) p.text('b7',245, 154)
				if (p.buttons[26].active) p.text('7',308, 154)
			}

			p.textSize(32)

			if (!p.done) p.text('note',93,233)

			if (!p.done) p.text('chord',210,233)

			p.text('new q',330,233)

			if (p.start) p.text('let\'s go', 205, 100)
		    else if (p.done) p.text('u got it', 205, 100)

		} else {

			for (var i = 0; i < p.buttons.length; i++) {
				if (i <= 2) continue
			    if (i > 14) continue
				p.buttons[i].display()
			}

			p.textSize(16);
			p.fill('yellow')
			p.text('1', 188, 49)
			p.text('b2/b9', 233 ,49)
			p.text('2', 308 ,49)
			p.text('b3',184, 84)
			p.text('3',248, 84)
			p.text('4',308, 84)
			p.text('b5/#11',170, 119)
			p.text('5',248, 119)
			p.text('#5/b13',288, 119)
			p.text('6',188, 154)
			p.text('b7',245, 154)
			p.text('7',308, 154)

			p.text('click a scale degree to hear C functioning as it', 95, 220)
		}
	}

	p.mousePressed = function() {
		var butt = checkForButton()
		return false
	}

	p.mouseReleased = function() {
		return false
    }

	function checkForButton() {
		console.log(p.mouseX,p.mouseY)

		if (p.mouseY > 40 && p.mouseY < 60)
			if (p.mouseX > 10 && p.mouseX < 70) 
				p.mode = 'learn'
			if (p.mouseX > 70 && p.mouseX < 125)
				p.mode = 'test'
        for (var i = 0; i < p.buttons.length; i++) {
            if (p.buttons[i].isInside(p.mouseX,p.mouseY)) {
                p.buttons[i].clicked();
                return;
            }
        }
    }

    function randomizeHarmony(){
    	p.cur = Math.floor(Math.random() * p.active.length)
    	p.cur = p.function.indexOf(p.active[p.cur])
    }

	function checkInput(func) {
		console.log(func, p.function[p.cur])
		if (func == p.function[p.cur]) setTimeout(function(){p.done = true; p.again = false},150)
		else (p.again = true)

	}
}