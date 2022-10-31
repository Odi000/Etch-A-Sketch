const etchDaSketch = document.getElementById('etch-da-sketch');
const screen = document.getElementById('screen');
const quality = document.querySelector('button');

createAppendDivs();

quality.onclick = resize;

function createAppendDivs(size = 16) {
    container.innerHTML = '';
    container.style.cssText = `grid-template-columns: repeat(${size},1fr)`;
    for(let i=0; i<size*size; i++){
        const newDiv = document.createElement('div');
        newDiv.addEventListener('mouseover', changeBgColor);
        container.appendChild(newDiv);
    }
}

function changeBgColor() {
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