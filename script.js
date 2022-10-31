const etchDaSketch = document.getElementById('etch-da-sketch');
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');
const pickedColor = () => document.getElementById('clr-picker').value;
const btnFunctions = {
    color: (e) => {
        e.target.style.backgroundColor = pickedColor();
    },
    shader: (e) => {
        const regExp = /[\d]+/g;
        let bgColor = e.target.style.backgroundColor;
        let shade = 25;
        
        if(bgColor === '') {
            bgColor = e.target.style.backgroundColor = 'rgb(255,255,255)'
        }
        
        const rgbValues = bgColor.match(regExp);
        
        e.target.style.backgroundColor = (
            `rgb(${rgbValues[0]-shade},${rgbValues[1]-shade},${rgbValues[2]-shade})`
            );
        },
        eraser: (e) => {
            e.target.style.backgroundColor = '';
        },
        reset: (e) => {
            createAppendDivs();
    },
    warm: (e) => {
        const red = getColorValue(128,255);
        const green = getColorValue(0,255);
        const blue = getColorValue(0,50);

        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    },
    cold: (e) => {
        const red = getColorValue(0,50);
        const green = getColorValue(0,255);
        const blue = getColorValue(128,255);

        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    }
}

createAppendDivs();

buttons.forEach(button => button.onclick = parseButton);

function createAppendDivs(side = 16) {
    screen.innerHTML = '';
    screen.style.cssText = `grid-template-columns: repeat(${side},1fr)`;
    for(let i=0; i<side*side; i++){
        const newDiv = document.createElement('div');
        newDiv.style.opacity = 0.9;
        newDiv.addEventListener('mouseover', checkPressedButton)
        screen.appendChild(newDiv);
    }
}

function parseButton(){
    if(this.id === 'reset') return btnFunctions[this.id]();
    if(this.classList.contains('pressed')){
        return this.classList.remove('pressed'),
        screen.classList.remove('hover');
    } 
    buttons.forEach(button => {
        button.classList.remove('pressed');
        screen.classList.remove('hover');
    })
    this.classList.add('pressed');
}

function checkPressedButton(e){
    buttons.forEach(button => {
        if(button.classList.contains('pressed')){
            btnFunctions[button.id](e);
            screen.classList.add('hover');
        }
    });
}

function getColorValue(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}




function changeg() {
    let baseRGB = 200;
    const regEx = /[\d]+/;
    let bgColor = this.style.backgroundColor;
    console.log(bgColor);
    if(!(regEx.test(bgColor))){
        return this.style.backgroundColor = `rgb(${baseRGB},${baseRGB},${baseRGB})`;
    }
    baseRGB = parseInt(bgColor.match(regEx)[0]);
    this.style.backgroundColor = `rgb(${baseRGB-25},${baseRGB-25},${baseRGB-25})`;
}

function resize() {
    const input = prompt('Adjust the resolution of the drawing board by putting the number of squares you want per side','');
    
    if(!input) return alert('put something muthafucka!');
    
    const size = parseInt(input);

    if(isNaN(size)||size<16||size>100)return alert('O raku do marresh men ti!');

    createAppendDivs(size);
}