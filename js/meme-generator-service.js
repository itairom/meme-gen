'use strict'
const KEY_MEM = 'MEMS';
const KEY_IMG = 'IMAGES';


const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCanvas
var gStartPos
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
    lines: [{
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red',
            xPos: 200,
            yPos: 50,
            isDragging: false
        },
        {
            txt: 'Second line',
            size: 20,
            align: 'left',
            color: 'red',
            xPos: 200,
            yPos: 300,
            isDragging: false
        }
    ]
}

function init() {
    // _createMemes()
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    loadGallery()
    drawImg()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt

    addListeners()
    renderCanvas()


}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
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
                size: 20,
                align: 'left',
                color: 'red',
                xPos: 200,
                yPos: 50,
                isDragging: false
            })
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
}

// function selectText(x, y) {
//     gCtx.fillStyle = 'white'
//     gCtx.strokeStyle = 'green'
//     gCtx.lineWidth = 5
//     gCtx.beginPath();
//     gCtx.rect(x, y, 100, -50)
//     gCtx.strokeStyle = 'red'
//     gCtx.stroke()
//     gCtx.closePath()
// }

function drawText(txt, x, y) {
    gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[0].size}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function updateText(txt) {

    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function renderCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    drawImg()
}

// ---------------------------------

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)

    gCanvas.addEventListener('mousedown', onDown)

    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)

    gCanvas.addEventListener('touchstart', onDown)

    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
        // if (!isTextClicked(pos)) return
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        gMeme.lines[gMeme.selectedLineIdx].xPos += dx
        gMeme.lines[gMeme.selectedLineIdx].yPos += dy

        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    const pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isTextClicked(clickedPos) {
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    const distance = Math.sqrt((pos.xPos - clickedPos.xPos) ** 2 + (pos.yPos - clickedPos.yPos) ** 2)
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size
}




// function renderCanvas() {
//     gCtx.fillStyle = "#ede5ff"
//     gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
// }