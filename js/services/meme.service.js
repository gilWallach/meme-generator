'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello',
            size: 38,
            align: 'center',
            color: '#ffffff',
            stroke: '#000',
            font: 'Impact',
            pos: {
                x: 0,
                y: 0
            }
        },
        {
            txt: 'Hi',
            size: 38,
            align: 'center',
            color: '#ffffff',
            stroke: '#000',
            font: 'Impact',
            pos: {
                x: 0,
                y: 0
            }
        },
    ]
}

// -----SET FUNCTIONS----- //
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    const { selectedLineIdx } = gMeme
    gMeme.lines[selectedLineIdx].txt = txt
}

function setFillColor(color) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].color = color
}

function setStrokeColor(color) {

    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].stroke = color
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setAlignment(alignTo) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignTo
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
}

function addEmoji(emojiNum) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt += ` ${emojiNum}`
}
// ------------------ //
function switchLine() {
    let idx = gMeme.selectedLineIdx
    if (idx === 0) idx = gMeme.lines.length - 1
    else if (idx >= gMeme.lines.length - 1) idx = 0
    else idx += 1

    gMeme.selectedLineIdx = idx
}

function addLine() {
    if(gMeme.lines.length < 3 ) gMeme.lines.push(_createLine())
}
function deleteLine() {
    const { lines, selectedLineIdx } = gMeme
    lines.splice(selectedLineIdx, 1)
}

// HANDLE LISTENER EVENTS
function isTxtClicked(clickedPos) {
    let { lines } = gMeme
    let isClicked

    lines.forEach((line, idx) => {
        const pos = line.pos
        const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
        if (distance <= line.size) {
            gMeme.selectedLineIdx = idx
            isClicked = true
        }
    })
    if (!isClicked) gMeme.selectedLineIdx = null
    return isClicked
}

// -----GET FUNCTIONS----- //
function getMeme() {
    return gMeme
}

// LOCAL FUNCTIONS
function _createLine() {
    return {
        txt: 'Type anything',
        size: 38,
        align: 'center',
        color: '#ffffff',
        stroke: '#000',
        font: 'Impact',
        pos: {
            x: 0,
            y: 0
        }
    }
}