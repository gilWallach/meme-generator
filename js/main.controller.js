'use strict'

function onGoToGallery(){
    document.querySelector('.editor').classList.remove('flex')
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.gallery').classList.remove('hide')
}

function onGoToEditor(imgNum){
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.add('flex')
    document.querySelector('.editor').classList.remove('hide')
    
    initEditor()
    renderMeme(imgNum)
}

// DISPLAY MOBILE
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}