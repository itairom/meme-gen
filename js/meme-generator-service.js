'use strict'
var gCanvas
let gCtx
let gLineSpace = 0
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
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt

}

function drawImg() {
    const elImg = new Image()
    elImg.src = `img/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        for (let i = 0; i < gMeme.lines.length; i++) {
            drawText(gMeme.lines[i].txt, gMeme.lines[i].xPos, gMeme.lines[i].yPos)
        }
    }
}

function addLine() {
    gLineSpace += 20
    gMeme.lines.push({ txt: 'Write a good one!', size: 20, align: 'left', color: 'red', xPos: 200, yPos: 200 + gLineSpace })
    renderCanvas()
}

function increaseFont() {
    console.log('in increaseFont', gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].size++
        console.log(gMeme.lines[gMeme.selectedLineIdx]);
    renderCanvas()
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
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

function onSelectMeme(imgId) {
    selectMeme(imgId)

    console.log('clicked', imgId);
    gMeme.selectedImgId = imgId;

    // document.body.querySelector('.gallery-container').style.visibility = "hidden";
    document.body.querySelector('.gallery-container').style.display = "none";

    document.body.querySelector('.bottom-bar').style.display = "none";

    document.body.querySelector('.main-body').style.display = "flex";
    document.body.querySelector('.canvas-container').style.visibility = "visible";
    document.body.querySelector('.canvas-container').style.display = "flex";
    document.body.querySelector('.control-box').style.visibility = "visible";
    document.body.querySelector('.control-box').style.display = "grid";

    renderCanvas()
}

function getMemes() {
    return gMeme;
}

function getImages() {
    return gImgs;
}

function returnToGallery() {
    document.body.querySelector('.main-body').style.display = "none";

    document.body.querySelector('.gallery-container').style.visibility = "visible";
    document.body.querySelector('.bottom-bar').style.display = "flex";

}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    console.log('RESIZE');
}



function changeLine() {
    let length = gMeme.lines.length;
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx === length) gMeme.selectedLineIdx = 0
    console.log(gMeme.selectedLineIdx);
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
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