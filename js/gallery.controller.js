'use strict'
const NUM_OF_IMGS = 18

function onInit(){
    renderGallery()
}

function renderGallery(){
    let strHTML = ``
    for(let i = 1; i <= NUM_OF_IMGS; i++){
        strHTML += `<button onclick="onImgSelect(${i})">
                    <img src="images/${i}.jpg" alt="">
                    </button>`
    }
    document.querySelector('.images').innerHTML = strHTML
}

function onImgSelect(imgId){
    setImg(imgId)
    initMeme()
}

