'use strict'
const KEY_MEM = 'MEMS';
const KEY_LOCAL_MEM = 'LOCAL_MEMS';
const KEY_IMG = 'IMAGES';

let gColor
var gCanvas
var gStartPos
var gCtx
var gLineSpace = 0
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['laugh'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['smiling'] },
    { id: 7, url: 'img/7.jpg', keywords: ['smiling'] },
    { id: 8, url: 'img/8.jpg', keywords: ['smiling'] },
    { id: 9, url: 'img/9.jpg', keywords: ['smiling'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['dance'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['dance'] },
    { id: 16, url: 'img/16.jpg', keywords: ['dance'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny'] },
];
var gLocalMeme = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
            txt: 'I never eat koba',
            size: 30,
            align: 'left',
            color: '#ffffff',
            xPos: 200,
            yPos: 50,
            isDragging: false,
            font: 'impact'
        },
        {
            txt: 'Second line',
            size: 30,
            align: 'left',
            color: 'yellow',
            xPos: 200,
            yPos: 300,
            isDragging: false,
            font: 'impact'
        }
    ]
}

function init() {
    _createMemes()
        // _createImages()
    _createLocaLMemes()
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    drawImg()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderCanvas()
}



function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function centerAlign() {
    gMeme.lines[gMeme.selectedLineIdx].xPos = 100
}

function leftAlign() {
    gMeme.lines[gMeme.selectedLineIdx].xPos = 0
}

function rightAlign() {
    gMeme.lines[gMeme.selectedLineIdx].xPos = 200
}

function getKeyWords() {

    let kewords = gImgs.map(keword => {
        return keword.keywords
    })

    var keywordsMap = kewords.reduce(function(acc, vote) {
        if (!acc[vote]) acc[vote] = 0;
        acc[vote]++
            return acc;
    }, {})

    return keywordsMap
}

function _createImages() {
    var imgs = loadFromStorage(KEY_IMG)
    if (!imgs || !imgs.length) {
        imgs = []
        for (var i = 0; i < gImgs.length; i++) {
            imgs.push(gImgs[i])
        }
    }
    gImgs = imgs;
    saveToStorage(KEY_IMG, gImgs)
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
            mems.lines.push({
                txt: 'I never eat Falafel',
                size: 40,
                align: 'left',
                color: '#ffffff',
                xPos: 100,
                yPos: 50 * (i + 3),
                isDragging: false,
                font: 'impact'
            })
        }
    }
    gMeme = mems;
    saveToStorage(KEY_MEM, gMeme)
}

function _createLocaLMemes() {
    var localMems = loadFromStorage(KEY_LOCAL_MEM)
    if (!localMems || !localMems.length) {
        localMems = []
    }
    gLocalMeme = localMems;
    saveToStorage(KEY_LOCAL_MEM, gLocalMeme)
}

function setColor(color) {
    gColor = color
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function drawImg() {
    const elImg = new Image()
    elImg.src = `img/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        for (let i = 0; i < gMeme.lines.length; i++) {
            drawText(gMeme.lines[i].txt, i, gMeme.lines[i].color, gMeme.lines[i].xPos, gMeme.lines[i].yPos)
        }
    }
}

function addLine() {
    gLineSpace += 20
    gMeme.lines.push({ txt: 'Write a good one!', size: 30, align: 'left', color: '#ffffff', xPos: 100, yPos: 200 + gLineSpace, font: 'impact' })
    saveToStorage(KEY_MEM, gMeme)
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    setCurrLine()
}

function setCurrLine() {
    gMeme.selectedLineIdx = 0
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
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
    gMeme.selectedImgId = imgId;
}

function getMemes() {

    return gMeme;
}

function getImages() {
    return gImgs;
}

function getLocalMemes() {
    return gLocalMeme;
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function changeLine() {

    let x = gMeme.lines[gMeme.selectedLineIdx].xPos
    let y = gMeme.lines[gMeme.selectedLineIdx].yPos

    let length = gMeme.lines.length;
    gMeme.selectedLineIdx++
        if (gMeme.selectedLineIdx === length) gMeme.selectedLineIdx = 0
}

function selectText(x, y) {
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'green'
    gCtx.lineWidth = 5
    gCtx.beginPath();
    gCtx.rect(x, y, 200, 50)
    gCtx.strokeStyle = 'red'
    gCtx.stroke()
    gCtx.closePath()
}

function drawText(txt, indx, color, x, y) {


    gCtx.fillStyle = color
    gCtx.lineWidth = 2;

    gCtx.font = `${gMeme.lines[indx].size}px ${gMeme.lines[indx].font}`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

}

function updateText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function renderCanvas() {
    drawImg()
}

function saveToLocal() {
    gLocalMeme.push(gMeme)
    saveToStorage(KEY_LOCAL_MEM, gLocalMeme)
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}