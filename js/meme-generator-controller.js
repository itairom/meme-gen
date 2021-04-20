'use strict'

function onInit() {
    init()
    loadGallery()
    drawImg()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onChangeLine() {
    changeLine()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
    document.querySelector('input[type="color"]').value = gMeme.lines[gMeme.selectedLineIdx].color
        // wrapText(gCtx, gMeme.lines[gMeme.selectedLineIdx].txt, gMeme.lines[gMeme.selectedLineIdx].xPos, gMeme.lines[gMeme.selectedLineIdx].yPos, 300, 100)
        // renderCanvas()
}

function onSetColor(color) {
    setColor(color)
    renderCanvas()
}


// function wrapText(context, text, x, y, maxWidth, lineHeight) {
//     var words = text.split(' ');
//     var line = '';

//     for (var n = 0; n < words.length; n++) {
//         var testLine = line + words[n] + ' ';
//         var metrics = context.measureText(testLine);
//         var testWidth = metrics.width;
//         if (testWidth > maxWidth && n > 0) {
//             context.fillText(line, x, y);
//             line = words[n] + ' ';
//             y += lineHeight;
//         } else {
//             line = testLine;
//         }
//     }
//     context.fillText(line, x, y);
// }

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function loadGallery() {
    var imgs = getImages()
    let strHtmls = imgs.map(img => {
        return `<img src="img/${img.id}.jpg" onclick="onSelectMeme(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function returnToGallery() {
    document.body.querySelector('.main-body').style.display = "none";
    document.body.querySelector('.gallery-container').style.visibility = "visible";
    document.body.querySelector('.gallery-container').style.display = "grid";
    document.body.querySelector('.bottom-bar').style.display = "flex";

}

function onUpdateText(txt) {
    updateText(txt)
    renderCanvas()
}

function onAddLine() {
    addLine()
    renderCanvas()
}

function onIncreaseFont() {
    increaseFont()
    renderCanvas()
}

function onDecreaseFont() {
    decreaseFont()
    renderCanvas()
}

function onMovingUp() {
    movingUp()
    renderCanvas()
}

function onMovingDown() {
    movingDown()
    renderCanvas()
}

function onChangeColor() {
    changeColor()
}

function onSelectMeme(imgId) {
    selectMeme(imgId)
    document.body.querySelector('.gallery-container').style.display = "none";
    document.body.querySelector('.bottom-bar').style.display = "none";
    document.body.querySelector('.main-body').style.display = "flex";
    document.body.querySelector('.canvas-container').style.visibility = "visible";
    document.body.querySelector('.canvas-container').style.display = "flex";
    document.body.querySelector('.control-box').style.visibility = "visible";
    document.body.querySelector('.control-box').style.display = "grid";
    renderCanvas()
}