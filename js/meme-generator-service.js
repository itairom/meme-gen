'use strict'
const KEY_MEM = 'MEMS';
const KEY_IMG = 'IMAGES';

var gCanvas
var gCtx
var gLineSpace = 0
var gKeywords = { 'happy': 3, 'funny puk': 1, 'smiling': 4, 'laugh': 2 }
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
    // _createMemes()
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    loadGallery()
    drawImg()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt



}

function _createMemes() {
    var mems = loadFromStorage(KEY_MEM)
    if (!mems || !mems.length) {
        mems = {
            selectedImgId: 5,
            selectedLineIdx: 0,
            lines: []
        }
        for (var i = 0; i < 2; i++) {
            mems.lines.push({ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red', xPos: 200, yPos: 50 })
        }
    }
    gMeme = mems;
    saveToStorage(KEY_MEM, gMeme)
}

function _saveCarsToStorage() {
    saveToStorage(KEY, gCars)
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
}

function increaseFont() {
    console.log('in increaseFont', gMeme.selectedLineIdx);
    gMeme.lines[gMeme.selectedLineIdx].size++
        console.log(gMeme.lines[gMeme.selectedLineIdx]);
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function movingUp() {
    gMeme.lines[gMeme.selectedLineIdx].yPos -= 10
}

function movingDown() {
    gMeme.lines[gMeme.selectedLineIdx].yPos += 10
}

function selectMeme(imgId) {
    console.log('clicked', imgId);
    gMeme.selectedImgId = imgId;
}

function getMemes() {
    return gMeme;
}

function getImages() {
    return gImgs;
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
}

function renderCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    drawImg()
}