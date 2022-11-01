const etchDaSketch = document.getElementById('etch-da-sketch');
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('button');
const bulbDivs = document.querySelectorAll('.bulbs');
const bulbs = [];
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
        
        const rgb = bgColor.match(regExp);
        const newrgb = rgb.map(value => value-shade);
        
        e.target.style.backgroundColor = (
            `rgb(${newrgb[0]},${newrgb[1]},${newrgb[2]})`
        );
    },
    eraser: (e) => {
        e.target.style.backgroundColor = '';
    },
    reset: (e) => {createAppendDivs()},
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

buttons.forEach(button => button.onclick = parseButton);
bulbDivs.forEach(div => {
    bulbs.push(div.firstElementChild);
    div.onclick = parseBulb;
});
createAppendDivs();

function createAppendDivs(side = 16) {
    screen.innerHTML = '';
    screen.style.cssText = `grid-template-columns: repeat(${side},1fr)`;
    switchBulbOn(side);

    for(let i=0; i<side*side; i++){
        const newDiv = document.createElement('div');
        newDiv.style.opacity = 0.9;
        newDiv.onmousedown = checkPressedButton;
        newDiv.onmouseover = checkPressedButton;
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

function parseBulb(){
    const chosenSize = Number(this.attributes.name.value);
    const turnedOnBulb = bulbs.find(bulb => bulb.classList.contains('on'));
    const turnedOnBulbNr = turnedOnBulb.id.match(/\d+/)[0];

    if(chosenSize == turnedOnBulbNr) return;
    createAppendDivs(chosenSize);
}

function checkPressedButton(e){
    buttons.forEach(button => {
        if(button.classList.contains('pressed')){
            screen.classList.add('hover');
            if(e.buttons !== 1) return;
            btnFunctions[button.id](e);
        }
    });
}

function getColorValue(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function switchBulbOn(nr){
    switch (true){
        case nr == 16:
            bulbs[0].classList.add('on');
            bulbs[1].classList.remove('on');
            bulbs[2].classList.remove('on');
            break;
        case nr == 32:
            bulbs[0].classList.remove('on');
            bulbs[1].classList.add('on');
            bulbs[2].classList.remove('on');
            break;
        case nr == 64:
            bulbs[0].classList.remove('on');
            bulbs[1].classList.remove('on');
            bulbs[2].classList.add('on');
            break;
    }
}