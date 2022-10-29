'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'animal': 16, 'baby': 2, 'politics': 11, 'love': 17, 'sleep': 4, 'evil': 0, 'men': 0, 'serious': 0, 'scary': 0, }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['love', 'animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['sleep', 'animal'] },
    { id: 4, url: 'img/4.jpg', keywords: ['sleep', 'animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['evil', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['men', 'funny'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['men', 'happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'evil'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politics', 'happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['love', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'men'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy', 'men'] },
    { id: 14, url: 'img/14.jpg', keywords: ['serious', 'men'] },
    { id: 15, url: 'img/15.jpg', keywords: ['serious', 'men'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy', 'men'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'men'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'scary'] },
]
var gCurrKeyword

function getImgsForDisplay() {
    let imgs = gImgs
    if (!gCurrKeyword) return gImgs

    let filteredImgs = imgs.filter(img => {
        const { keywords } = img
        const strKeyWords = keywords.join(',')
        if (strKeyWords.includes(gCurrKeyword)) return true
    })
    return filteredImgs
}

function setKeyWord(chars) {
    gCurrKeyword = chars
}

function setKeywordSearchCountMap(chars) {
    const keywordSearchCountMap = gKeywordSearchCountMap
    for (const key in keywordSearchCountMap){
        if(key.includes(chars)) keywordSearchCountMap[key] += 1
    }
}

function getKeywordSearchCountMap(){
    return gKeywordSearchCountMap
}

