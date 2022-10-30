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
    renderTxt(lines)
    // selected line rect
    if (!gIsCanvasClicked) renderSelectedLineFocus()
  }
}

function renderTxt(lines) {
  lines.forEach((line, idx) => {
    const { txt, size, align, color, stroke, font } = line
    gCtx.lineWidth = 5
    gCtx.fillStyle = color
    gCtx.strokeStyle = stroke
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align

    if (!line.pos) setDefaultPos(line, align, txt, idx, size)

    let { x, y } = line.pos
    gCtx.strokeText(txt, x, y)
    gCtx.fillText(txt, x, y)
  })
}

function setDefaultPos(line, align, txt, idx, size) {
  const x = setXByAlignment(align, txt)
  const y = setYByLineIdx(idx, size)

  line.pos = {
    x: x,
    y: y
  }
}

function renderSelectedLineFocus() {
  const { txt, size, pos, align, isDrag } = getSelectedLine()
  const width = gCtx.measureText(txt).width
  let x
  let y = pos.y - size - 10
  if (align === 'center' || isDrag) x = pos.x - width / 2 - 20

  else if (align === 'left') x = pos.x - 20
  else x = pos.x - width -20

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
  const width = gCtx.measureText(txt).width
  switch (align) {
    case 'left': x = 20
      break
    case 'center': x = gElCanvas.width / 2
      break
    case 'right': x = gElCanvas.width - 20
      break
  }
  return x
}

function setYByLineIdx(idx, size) {
  let y
  switch (idx) {
    case idx = 0: y = size + 20
      break
    case idx = 1: y = gElCanvas.height - size - 20
      break
    case idx = 2: y = gElCanvas.height / 2 + 20
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
  document.querySelector('.txt-input').value = ''
  renderMeme()
}

function onAddLine() {
  document.querySelector('.txt-input').value = ''
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
  const line = getSelectedLine()
  console.log(line)
  const { txt, size } = line
  const { selectedLineIdx } = getMeme()
  setDefaultPos(line, alignTo, txt, selectedLineIdx, size)
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
    document.querySelector('.txt-input').value = ''
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
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
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
  const line = getSelectedLine()

  const pos = getEvPos(ev)
  if (!isTxtClicked(pos)) return
  setTxtDrag(line, true)
  setLinePos(line, pos)

  gIsCanvasClicked = false
  renderMeme()
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const line = getSelectedLine()
  const { isDrag } = line
  if (!isDrag) return
  
  const pos = getEvPos(ev)
  const dx = pos.x - line.pos.x
  const dy = pos.y - line.pos.y
  
  moveTxt(dx, dy)
  renderMeme()
}

function onUp() {
  const line = getSelectedLine()
  setTxtDrag(line, false)
  document.body.style.cursor = 'default'
}