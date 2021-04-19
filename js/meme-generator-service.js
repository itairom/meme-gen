'use strict'
var gCanvas
let gCtx

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
];
var gMeme = {

    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red', xPos: 200, yPos: 50 },
        { txt: 'Second line', size: 20, align: 'left', color: 'red', xPos: 200, yPos: 300 }
    ]
}

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    loadGallery()

    drawImg()
        ////// PART 8 //////
        // resizeCanvas()

    // imageObj.onload = function(){
    //     context.drawImage(imageObj, 10, 10);
    //     context.font = "40pt Calibri";
    //     context.fillText("My TEXT!", 20, 20);

}

function increaseFont() {
    console.log('in increaseFont', gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].size++
        renderCanvas()
}

function movingUp() {
    gMeme.lines[gMeme.selectedLineIdx].yPos -= 10
    renderCanvas()
}

function movingDown() {
    gMeme.lines[gMeme.selectedLineIdx].yPos += 10
    renderCanvas()
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
        renderCanvas()
}

function onSelectMeme(imgId) {
    selectMeme(imgId)

    console.log('clicked', imgId);
    gMeme.selectedImgId = imgId;

    document.body.querySelector('.canvas-container').style.visibility = "visible";
    renderCanvas()
}

function getMemes() {
    return gMeme;
}

function getImages() {
    return gImgs;
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    console.log('RESIZE');
    // TODO: redraw..
}

function drawImg() {
    const elImg = new Image()
    elImg.src = `img/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drawText(gMeme.lines[0].txt, gMeme.lines[0].xPos, gMeme.lines[0].yPos)
        drawText(gMeme.lines[1].txt, gMeme.lines[1].xPos, gMeme.lines[1].yPos)
    }
}

function changeLine() {
    let length = gMeme.lines.length;
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx === length) gMeme.selectedLineIdx = 0
    console.log(gMeme.selectedLineIdx);
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt

    // selectText(gMeme.lines[gMeme.selectedLineIdx].xPos, gMeme.lines[gMeme.selectedLineIdx].yPos)

}

function selectText(x, y) {
    gCtx.fillStyle = 'white'

    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 5

    gCtx.beginPath();
    gCtx.rect(x, y, 100, -50)

    gCtx.strokeStyle = 'red'
    gCtx.stroke()
    gCtx.closePath()


}



function drawText(txt, x, y) {
    gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[0].size}px impact`;
    gCtx.fillText(txt, x, y);


    gCtx.strokeText(txt, x, y);
}

function updateText(txt) {
    console.log(txt);
    // let elTxt = document.querySelector('input[name="modify-txt"]').value
    // console.log(elTxt);
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderCanvas()
}

function renderCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    drawImg()

}