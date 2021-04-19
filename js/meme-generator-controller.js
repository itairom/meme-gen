'use strict'

function loadGallery() {
    var imgs = getImages()
    let strHtmls = imgs.map(img => {
        return `<img src="img/${img.id}.jpg" onclick="onSelectMeme(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')

}

function selectMeme(id) {
    let memes


}