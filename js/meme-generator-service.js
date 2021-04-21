'use strict'
const KEY_MEM = 'MEMS';
const KEY_LOCAL_MEM = 'LOCAL_MEMS';
const KEY_IMG = 'IMAGES';

// let colorPicker = document.querySelector('.color-picker')
let gColor
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCanvas
var gStartPos
var gCtx
var gLineSpace = 0
var gKeywords = { 'happy': 3, 'funny puk': 1, 'smiling': 4, 'laugh': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['laugh'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny puk'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['smiling'] },
    { id: 7, url: 'img/7.jpg', keywords: ['smiling'] },
    { id: 8, url: 'img/8.jpg', keywords: ['smiling'] },
    { id: 9, url: 'img/9.jpg', keywords: ['smiling'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['laugh'] },
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
            isDragging: false
        },
        {
            txt: 'Second line',
            size: 30,
            align: 'left',
            color: 'yellow',
            xPos: 200,
            yPos: 300,
            isDragging: false
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
        // addListeners()
    renderCanvas()
}

function centerAlign() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
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
                xPos: 200,
                yPos: 50 * (i + 3),
                isDragging: false
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
    gMeme.lines.push({ txt: 'Write a good one!', size: 20, align: 'left', color: '#ffffff', xPos: 200, yPos: 200 + gLineSpace })
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
    let h = 100
    let w = txt.length

    gCtx.fillStyle = color
    gCtx.lineWidth = 2;
    var hMargin = 4;

    gCtx.font = `${gMeme.lines[indx].size}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);

}


// function drawTextInBox(txt, font, x, y, w, h, angle) {
//     angle = angle || 0;
//     var fontHeight = 20;
//     var hMargin = 4;
//     gCtx.font = fontHeight + 'px ' + font;
//     gCtx.textAlign = 'left';
//     gCtx.textBaseline = 'top';
//     var txtWidth = gCtx.measureText(txt).width + 2 * hMargin;
//     gCtx.save();
//     gCtx.translate(x + w / 2, y);
//     gCtx.rotate(angle);
//     gCtx.strokeRect(-w / 2, 0, w, h);
//     gCtx.scale(w / txtWidth, h / fontHeight);
//     gCtx.translate(hMargin, 0)
//     gCtx.fillText(txt, -txtWidth / 2, 0);
//     gCtx.restore();
// }

// drawTextInBox('This is a line', 'Arial', 2, 2, 60, 20);



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

// ---------------------------------

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     window.addEventListener('resize', () => {
//         renderCanvas()
//     })

// }

// function addMouseListeners() {
//     gCanvas.addEventListener('mousemove', onMove)
//     gCanvas.addEventListener('mousedown', onDown)
//     gCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gCanvas.addEventListener('touchmove', onMove)
//     gCanvas.addEventListener('touchstart', onDown)
//     gCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isTextClicked(pos)) return
//     gMeme.lines[gMeme.selectedLineIdx].isDragging = true
//     gStartPos = pos
//         // document.body.style.cursor = 'grabbing'
//     renderCanvas()

// }

// function onMove(ev) {
//     if (gMeme.lines[gMeme.selectedLineIdx].isDragging) {
//         const pos = getEvPos(ev)
//         const dx = pos.x - gStartPos.x
//         const dy = pos.y - gStartPos.y

//         gMeme.lines[gMeme.selectedLineIdx].xPos += dx
//         gMeme.lines[gMeme.selectedLineIdx].yPos += dy

//         const rect = el.getboun

//         gStartPos = pos
//         renderCanvas()
//     }
// }

// function onUp() {
//     gMeme.lines[gMeme.selectedLineIdx].isDragging = false
// }

// function getEvPos(ev) {
//     const pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
//         }
//     }
//     return pos
// }

// function isTextClicked(clickedPos) {
//     const posX = gMeme.lines[gMeme.selectedLineIdx].xPos
//     const posY = gMeme.lines[gMeme.selectedLineIdx].yPos
//     console.log('clickedPos', clickedPos);
//     console.log('clickedPos', posX - clickedPos.x, posY - clickedPos.y);



//     const distance = Math.abs(posX - clickedPos.x + posY - clickedPos.y)
//     console.log(distance);
//     return distance <= 50 // TODO- calculate agian 
// }