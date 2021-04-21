'use strict'

function onInit() {
    init()
    onGetKeyWords()
    loadGallery()
    drawImg()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
}



function onToggleAbout() {
    document.querySelector('.main-body').style.display = 'none'
    document.body.querySelector('.local-gallery-main').style.display = "none";
    document.body.querySelector('.gallery-main').style.display = "none";
    document.body.querySelector('.about-modal').style.display = "flex";
    toggleMenu()

    renderCanvas()
}

function onSetFont(font) {
    setFont(font)
    document.querySelector('.font-list').style.display = 'none'
    document.querySelector('.font-list').style.visibility = 'hidden'

    renderCanvas()
}

function onToggleFont() {
    console.log('toggle');
    document.querySelector('.font-list').style.visibility = 'visible'
        // document.querySelector('.font-list').style.display = 'flex'

    // renderCanvas()

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onCenterAlign() {
    centerAlign()
    renderCanvas()
}

function onLeftAlign() {
    leftAlign()
    renderCanvas()
}

function onRightAlign() {
    rightAlign()
    renderCanvas()
}

function onChangeLine() {
    changeLine()
    document.querySelector('input[name="modify-txt"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
    document.querySelector('input[type="color"]').value = gMeme.lines[gMeme.selectedLineIdx].color
}

function onSetColor(color) {
    setColor(color)
    renderCanvas()
}

function onGetKeyWords() {
    let keywords = getKeyWords()
    var keywordsArr = Object.keys(keywords).map((key) => [Object(key), keywords[key]]);
    let strHtmls = keywordsArr.map(keyword => {
        return `<h2 style="font-size:${keyword[1]*10}px ;" style="">${keyword[0]}</h2>`
    })
    document.querySelector('.keywords-container').innerHTML = strHtmls.join('')
}

function onToggleShare() {
    document.querySelector('.share-modal').style.display = 'flex';

}

function onDownloadCanvas(elLink) {
    downloadCanvas(elLink)
    document.querySelector('.share-modal').style.display = 'none';
}

function onSaveToLocal() {
    saveToLocal()
    document.querySelector('.share-modal').style.display = 'none';
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function loadGallery() {
    var imgs = getImages()
    let strHtmls = imgs.map(img => {
        return `<img src="img/${img.id}.jpg" onclick="onSelectMeme(${img.id})">`
    })
    document.querySelector('.gallery-main .gallery-container').innerHTML = strHtmls.join('')
}

function OnOpenLocalGallery() {
    var imgs = getLocalMemes()
    let strHtmls = imgs.map(img => {
        return ` <div class="local-img">
        <img style="" src="img/${img.selectedImgId}.jpg" onclick="onSelectMeme(${img.selectedImgId})">
        <h2 onclick="onSelectMeme(${img.selectedImgId})">${img.lines[0].txt}</h2>
        </div>`
    })
    document.querySelector('.local-gallery-main .gallery-container').innerHTML = strHtmls.join('')
    document.body.querySelector('.gallery-container').style.display = "none";
    document.body.querySelector('.main-body').style.display = "none";
    document.body.querySelector('.local-gallery-main').style.visibility = "visible";
    document.body.querySelector('.local-gallery-main').style.display = "grid";
    document.body.querySelector('.bottom-bar').style.display = "flex";
    document.body.querySelector('.about-modal').style.display = "none";
    toggleMenu()

}

function returnToGallery() {
    document.body.querySelector('.local-gallery-main').style.display = "none";
    document.body.querySelector('.main-body').style.display = "none";
    document.body.querySelector('.gallery-main').style.display = "flex";
    document.body.querySelector('.gallery-container').style.display = "grid";
    document.body.querySelector('.bottom-bar').style.display = "flex";
    document.body.querySelector('.about-modal').style.display = "none";
    toggleMenu()

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
    document.body.querySelector('.local-gallery-main').style.display = "none";
    document.body.querySelector('.bottom-bar').style.display = "none";
    document.body.querySelector('.main-body').style.display = "flex";
    document.body.querySelector('.canvas-container').style.visibility = "visible";
    document.body.querySelector('.canvas-container').style.display = "flex";
    document.body.querySelector('.control-box').style.visibility = "visible";
    document.body.querySelector('.control-box').style.display = "grid";
    renderCanvas()
}