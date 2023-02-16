'use strict'

let gElCanvas
let gCtx
let gImgFrame
const STORAGE_KEY = 'savedMemes'
let gSavedMemes = loadFromStorage(STORAGE_KEY)

function onInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  if (!gSavedMemes) {
    gSavedMemes = []
  } else {
    gSavedMemes = loadFromStorage(STORAGE_KEY)
  }
  renderGallery()
}

function onHideFocus() {
  document.querySelector('.focus').style.display = 'none'
}

function onAlignLeft() {
  const meme = getMeme()
  // meme.lines.forEach(line => (line.width = 20))
  gCtx.textAlign = 'left'
  renderMeme(meme)
}

function onAlignCenter() {
  const meme = getMeme()
  // meme.lines.forEach(line => (line.width = 120))
  gCtx.textAlign = 'center'
  renderMeme(meme)
}
function onAlignRight() {
  const meme = getMeme()
  // meme.lines.forEach(line => (line.width = 250))
  gCtx.textAlign = 'right'
  renderMeme(meme)
}

function render(meme) {
  gCtx.strokeStyle = 'black'
  gCtx.save()
  gImgFrame = new Image()
  gImgFrame.src = gImgs[meme.imgId].url
  gImgFrame.onload = function () {
    gCtx.drawImage(gImgFrame, 0, 0, gElCanvas.width, gElCanvas.height)
  }

  gImgFrame.addEventListener('load', function () {
    meme.lines.forEach((line, i) => {
      gCtx.textBaseline = 'top'
      gCtx.font = `${line.size}px ${line.font}`
      gCtx.fillStyle = line.color
      gCtx.fillText(
        meme.lines[i].txt,
        meme.lines[i].width,
        meme.lines[i].height
      )
    })
  })
}

function renderMeme(meme) {
  render(meme)
}

function onChangeFont(val) {
  const meme = getMeme()
  meme.lines[meme.lineIdx].font = val
  renderMeme(meme)
}

function onAddText() {
  if (!gMeme.isSecondLineAdded) {
    addText(500)
    gCtx.fillText(gMeme.lines[1].txt, gMeme.lines[1].width, 500)
  } else {
    addText(gElCanvas.height / 2)
    gCtx.fillText(
      gMeme.lines[1].txt,
      gMeme.lines[1].width,
      gElCanvas.height / 2
    )
  }
  gMeme.isSecondLineAdded = true
}

function changeColor(color) {
  const meme = getMeme()
  meme.lines[meme.lineIdx].color = color
  renderMeme(meme)
}

function onUpperCase() {
  const meme = getMeme()
  if (!meme.isUpperCased) {
    meme.lines[meme.lineIdx].txt = meme.lines[meme.lineIdx].txt.toUpperCase()
  } else {
    meme.lines[meme.lineIdx].txt = meme.lines[meme.lineIdx].txt.toLowerCase()
  }
  meme.isUpperCased = !meme.isUpperCased
  renderMeme(meme)
}

function onIncreaseTxtSize() {
  const meme = getMeme()
  meme.lines[meme.lineIdx].size += 4
  renderMeme(meme)
}
function onLowerTxtSize() {
  const meme = getMeme()
  meme.lines[meme.lineIdx].size -= 4
  renderMeme(meme)
}

function onSwitchLine() {
  const meme = getMeme()
  if (meme.lineFocus) meme.lineIdx++
  if (meme.lineIdx >= meme.lines.length) meme.lineIdx = 0
  document.querySelector('.focus').style.display = 'block'
  document.querySelector('.focus').style.top =
    meme.lines[meme.lineIdx].height + 'px'
  meme.lineFocus = true
}

function onDeleteTxt() {
  const meme = getMeme()
  meme.lines.splice(meme.lineIdx, 1)
  renderMeme(meme)
}

function onRenderSavedMemes() {
  const savedMemesContainerEl = document.querySelector('.saved-memes-container')
  savedMemesContainerEl.classList.remove('hidden')
  const savedMemesEl = document.querySelector('.saved-memes')
  hideEditor()
  document.querySelector('.filler').classList.add('hidden')
  document.querySelector('.gallery-container').classList.add('hidden')
  const savedMemes = loadFromStorage(STORAGE_KEY)
  if (!savedMemes) {
    savedMemesEl.innerHTML = `<p class="empty">No Saved Memes<p>`
  } else {
    var str = savedMemes.map(
      meme =>
        `<img onclick="onImgSelect(${meme.imgId}, '${
          meme.memeId
        }')" class="gallery-img" src="${gImgs[meme.imgId].url}" alt="">`
    )
    savedMemesEl.innerHTML = str.join('')
  }
}

function onSaveMeme() {
  const newMeme = { ...gMeme }
  gSavedMemes.push(newMeme)
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

function onSetFilter(val) {
  gFilterBy.txt = val
  renderGallery()
}
