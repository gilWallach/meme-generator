'use strict'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const FONT_FAMILIES = ['Impact', 'Helvetica', 'Arial', 'Arial Black', 'Verdana', 'Tahoma', 'Gill Sans', 'Trebuchet MS', 'Georgia', 'Baskerville', 'Courier', 'Lucida', 'Comic Sans MS']

let gElCanvas
let gCtx
let gIsCanvasClicked = false

function initMeme() {
  gElCanvas = document.querySelector('.canvas')
  gCtx = gElCanvas.getContext('2d')

  document.querySelector('.gallery').classList.add('hide')
  document.querySelector('.editor').classList.add('flex')
  document.querySelector('.editor').classList.remove('hide')
  addListeners()
  renderMeme()
}

function renderMeme() {
  const { selectedImgId, lines } = getMeme()
  //  render img 
  const img = new Image()
  img.src = `images/${selectedImgId}.jpg`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    //  render txt 
    lines.forEach((line, idx) => {
      const { txt, size, align, color, stroke, font } = line
      gCtx.lineWidth = 5
      gCtx.fillStyle = color
      gCtx.strokeStyle = stroke
      gCtx.font = `${size}px ${font}`
      gCtx.textAlign = align
      const x = setXByAlignment(align, txt)
      const y = setYByLineIdx(idx, size) + size + 10
      line.pos = {
        x: x,
        y: y
      }

      gCtx.strokeText(txt, x, y)
      gCtx.fillText(txt, x, y)
    })
    // selected line rect
    if (!gIsCanvasClicked) renderSelectedLineFocus()
  }
}

function renderSelectedLineFocus() {
  const { lines, selectedLineIdx } = getMeme()
  const { txt, align, size } = lines[selectedLineIdx]
  const width = gCtx.measureText(txt).width
  const x = setXByAlignment(align) - width / 2 - 20
  const y = setYByLineIdx(selectedLineIdx, size)

  gCtx.beginPath()
  gCtx.rect(x, y, width + 40, size + 20);
  gCtx.stroke();
}

renderFontsOptions()
function renderFontsOptions() {
  let strHTML = ''

  FONT_FAMILIES.map((family) => {
    strHTML += `
  <option value="${family}">${family}</option>`
  })
  document.querySelector('.font-style-select').innerHTML = strHTML
}

function setXByAlignment(align, txt) {
  let x
  switch (align) {
    case 'left': x = gCtx.measureText(txt).width / 2
      break
    case 'center': x = gElCanvas.width / 2
      break
    case 'right': x = gElCanvas.width - gCtx.measureText(txt).width / 2
      break
  }
  return x
}

function setYByLineIdx(idx, size) {
  let y
  switch (idx) {
    case idx = 0: y = size - 20
      break
    case idx = 1: y = gElCanvas.height - size - 40
      break
    case idx = 2: y = gElCanvas.height / 2 - size
      break
  }
  return y
}
function onSetTxt(txt) {
  setLineTxt(txt)
  gIsCanvasClicked = false
  renderMeme()
}

function onClearInput() {
  document.querySelector('.txt-input').value = ''
}

function onSetFillColor(color) {
  setFillColor(color)
  renderMeme()
}

function onSetStrokeColor(color) {
  setStrokeColor(color)
  renderMeme()
}

function onSetFontSize(diff) {
  setFontSize(diff)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  gIsCanvasClicked = false
  renderMeme()
}

function onAddLine() {
  addLine()
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  gIsCanvasClicked = true
  let { selectedLineIdx } = gMeme
  selectedLineIdx = null
  renderMeme()
}

function onSetAlignment(alignTo) {
  setAlignment(alignTo)
  renderMeme()
}

function onSetFontFamily(fontFamily) {
  setFontFamily(fontFamily)
  renderMeme()
}

function onOpenFillClrPicker() {
  document.querySelector('.fill-input').click()
}

function onOpenStrokeClrPicker() {
  document.querySelector('.stroke-input').click()
}

function onAddEmoji(elEmoji) {
  addEmoji(elEmoji.innerText)
  renderMeme()
}

function onCanvasClicked(ev) {
  const pos = getEvPos(ev)
  let isTxt = isTxtClicked(pos)
  if (isTxt) {
    gIsCanvasClicked = false
    renderMeme()
    renderSelectedLineFocus()
  }
  else {
    gIsCanvasClicked = true
    let { selectedLineIdx } = getMeme()
    selectedLineIdx = null
  }
  renderMeme()
}

function onDownload(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

// ADD LISTENERS
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //Listen for resize ev 
  window.addEventListener('resize', () => {
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
}

// HANDLE LISTENER EVENTS
function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY
  }
  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    }
  }
  return pos
}

function onDown(ev) {
  const pos = getEvPos(ev)
  if (!isTxtClicked(pos)) return

  gIsCanvasClicked = false
  renderMeme()
}