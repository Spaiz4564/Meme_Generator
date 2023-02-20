'use strict'

let gElCanvas
let gCtx
let gImgFrame
const STORAGE_KEY = 'savedMemes'
const STORAGE_KEY_DEFAULT = 'savedMemesDefault'
let gSavedMemesURLS = loadFromStorage(STORAGE_KEY)
let gSavedMemes = loadFromStorage(STORAGE_KEY_DEFAULT)

function onInit() {
  gElCanvas = document.querySelector('#my-canvas')
  gCtx = gElCanvas.getContext('2d')
  if (!gSavedMemesURLS) {
    gSavedMemesURLS = []
  } else {
    gSavedMemesURLS = loadFromStorage(STORAGE_KEY)
  }

  if (!gSavedMemes) {
    gSavedMemes = []
  } else {
    gSavedMemes = loadFromStorage(STORAGE_KEY_DEFAULT)
  }

  renderGallery()
  handleTipsSize()
}

function onAlign(dir) {
  const meme = getMeme()
  if (dir === 'right') {
    meme.lines[meme.lineIdx].width = 520
  } else if (dir === 'left') {
    meme.lines[meme.lineIdx].width = 20
  } else {
    meme.lines[meme.lineIdx].width = gElCanvas.width / 2
  }
  meme.lines[meme.lineIdx].alignDir = dir
  render(meme)
}

function handleTipsSize() {
  const keyWords = getKeyWords()
  const options = document.querySelectorAll('.tips option')
  options.forEach(option => {
    if (keyWords[option.value] >= 26) return
    option.style.fontSize = keyWords[option.value] + 'px'
  })
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
      gCtx.textAlign = meme.lines[i].alignDir

      gCtx.font = `${line.size}px ${line.font}`
      gCtx.fillStyle = line.color
      gCtx.fillText(
        meme.lines[i].txt,
        meme.lines[i].width,
        meme.lines[i].height,
        gElCanvas.width
      )
    })
  })
  if (!gMeme.isSecondLineAdded) {
    onSwitchLine()
    document.querySelector('.txt-input').value = meme.lines[meme.lineIdx].txt
  }
}

function onActivateTroll() {
  document.querySelector(
    '.nav a'
  ).innerHTML = `<i class='fa-solid fa-face-smile-wink'></i>`
}

function renderMeme(meme) {
  render(meme)
}

function onRenderRandomMeme() {
  document.querySelector('.gallery-container').classList.add('hidden')
  showEditor()
  const meme = getMeme()
  const randomNum = Math.floor(Math.random() * gImgs.length)
  setImg(randomNum)
  renderMeme(meme)
}

function onChangeFont(val) {
  const meme = getMeme()
  meme.lines[meme.lineIdx].font = val
  renderMeme(meme)
}

function onAddText() {
  const meme = getMeme()
  if (!meme.isSecondLineAdded) {
    addText(500)
    gCtx.fillText('i love dank memes', gElCanvas.width / 2, 500)
  } else {
    addText(gElCanvas.height / 2)
    gCtx.fillText(meme.lines[1].txt, meme.lines[1].width, gElCanvas.height / 2)
  }
  meme.isSecondLineAdded = true
  document.querySelector('.txt-input').value = meme.lines[meme.lineIdx].txt
  onSwitchLine()
}

function onMoveTxt(dir) {
  const meme = getMeme()
  const memeCurrLine = meme.lines[meme.lineIdx]
  if (dir === 'down') {
    if (memeCurrLine.height >= 530) return
    memeCurrLine.height += 10
  } else if (dir === 'up') {
    if (memeCurrLine.height <= 10) return
    memeCurrLine.height -= 10
  } else if (dir === 'left') {
    if (memeCurrLine.width <= 125) return
    memeCurrLine.width -= 10
  } else {
    if (memeCurrLine.width >= 425) return
    memeCurrLine.width += 10
  }
  document.querySelector('.focus').style.height = memeCurrLine.size + 'px'
  document.querySelector('.focus').style.top = memeCurrLine.height + 'px'
  render(meme)
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
  document.querySelector('.focus').style.height =
    meme.lines[meme.lineIdx].size + 'px'
  document.querySelector('.focus').style.top =
    meme.lines[meme.lineIdx].height + 'px'
  meme.lineFocus = true
  document.querySelector('.txt-input').value = meme.lines[meme.lineIdx].txt
}

function onDeleteTxt() {
  const meme = getMeme()
  meme.lines.splice(meme.lineIdx, 1)
  renderMeme(meme)
  document.querySelector('.txt-input').value = ''
}

function onRenderSavedMemes() {
  onCloseModal()
  const savedMemesContainerEl = document.querySelector('.saved-memes-container')
  savedMemesContainerEl.classList.remove('hidden')
  const savedMemesEl = document.querySelector('.saved-memes')
  hideEditor()
  document.querySelector('.filler').classList.add('hidden')
  document.querySelector('.gallery-container').classList.add('hidden')
  const savedMemesURLS = loadFromStorage(STORAGE_KEY)
  const savedMemesDefault = loadFromStorage(STORAGE_KEY_DEFAULT)
  if (!savedMemesURLS) {
    savedMemesEl.innerHTML = `<p class="empty">No Saved Memes<p>`
  } else {
    var str = savedMemesURLS.map(
      (meme, i) =>
        `<img onclick="onImgSelect(${savedMemesDefault[i].imgId}, '${savedMemesDefault[i].memeId}')" class="gallery-img" src="${meme}" alt="">`
    )
    savedMemesEl.innerHTML = str.join('')
  }
}

function onSaveMeme() {
  const savedMemesUrls = getSavedMemesURLS()
  const savedMemesDefault = getSavedMemes()
  const newMeme = { ...gMeme }
  const meme = gElCanvas.toDataURL()
  savedMemesDefault.push(newMeme)
  savedMemesUrls.push(meme)
  saveToStorage(STORAGE_KEY, gSavedMemesURLS)
  saveToStorage(STORAGE_KEY_DEFAULT, gSavedMemes)
  handlePopUp('Meme saved')
}

function handlePopUp(txt) {
  const popUpEl = document.querySelector('.pop-up')
  const popUpSpanEl = document.querySelector('.pop-up span')
  popUpSpanEl.innerText = txt
  popUpEl.style.opacity = '1'
  setTimeout(() => {
    popUpEl.style.opacity = '0'
  }, 1500)
}

function onSetFilter(val) {
  const filter = getFilterBy()
  if (!val) {
    filter.txt = ''
    renderGallery()
    return
  }
  if (document.querySelector([`.tips [value=${val}]`])) {
    document.querySelector([`.tips [value=${val}]`]).style.animation = 'bounce'
    document.querySelector([`.tips [value=${val}]`]).style.animationDuration =
      '2s'
    setTimeout(() => {
      document.querySelector([`.tips [value=${val}]`]).style.animation = ''
      document.querySelector([`.tips [value=${val}]`]).style.animationDuration =
        ''
    }, 2000)
  }

  gKeywordSearchCountMap[val] += 3
  handleTipsSize()
  filter.txt = val
  renderGallery()
}

function onHideFocus() {
  document.querySelector('.focus').style.display = 'none'
}
