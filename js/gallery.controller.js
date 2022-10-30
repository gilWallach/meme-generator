'use strict'
function onInit() {
    renderGallery()
    renderSearchDataList()
}

function renderGallery() {
    const imgs = getImgsForDisplay()
    document.querySelector('.keywords').innerHTML = getKeyWordsStrHTML('preview')
    var strHTML = imgs.map(img => 
        `<a href="#" onclick="onImgSelect(${img.id})">
                    <img src="images/${img.id}.jpg" alt="">
                    </a>`
    )
    document.querySelector('.images').innerHTML = strHTML.join('')
}

function renderSearchDataList(){
    const keywordSearchCountMap = getKeywordSearchCountMap()
    let strHTML = ``
    for (const key in keywordSearchCountMap){
        strHTML += `<option value="${key}">`
    }
    document.querySelector('.data-list-search').innerHTML = strHTML
    document.querySelector('.data-list-search').setAttribute('autocomplete', 'on')

}

function getKeyWordsStrHTML(amount){
    const keywordSearchCountMap = getKeywordSearchCountMap()
    let currClass = ``
    let strHTML = `<a class="small-keyWord" href="#" onclick="onSearchByKeyword('')">All</a>`
    const keywordSearchCountMapArray = Object.entries(keywordSearchCountMap)
    let amountToRender = amount === 'preview' ? 5 : keywordSearchCountMapArray.length
    for (let i = 0; i < amountToRender; i++){
        const currKey = keywordSearchCountMapArray[i]
        if(currKey[1] > 15) currClass = 'large-keyWord'
        else if (currKey[1] > 10) currClass = 'medium-keyWord'
        else currClass = 'small-keyWord'
        strHTML += `<a class="${currClass}"href="#" onclick="onSearchByKeyword('${currKey[0]}')">${currKey[0]}</a>`
    }
    return strHTML
}

function onOpenKeywordsModal(){
    toggleModal()
    document.querySelector('.keywords-modal').innerHTML = getKeyWordsStrHTML('all')
    document.querySelector('.keywords-modal').classList.remove('hide')
    document.querySelector('.keywords-modal').classList.add('flex')
}
function onSearchByKeyword(chars) {
    setKeyWord(chars)
    setKeywordSearchCountMap(chars)
    renderGallery()
}

function onGoToGallery() {
    document.querySelector('.editor').classList.remove('flex')
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.gallery').classList.remove('hide')
}

function onGoToEditor(imgNum) {
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.add('flex')
    document.querySelector('.editor').classList.remove('hide')

    initEditor()
    renderMeme(imgNum)
}

function onImgSelect(imgId) {
    setImg(imgId)
    initMeme()
}

// DISPLAY MOBILE
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}
function toggleModal() {
    document.body.classList.toggle('modal-open')
}

