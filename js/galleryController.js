'use strict'

let gFilterBy = { txt: '' }

function renderGallery() {
  onCloseModal()
  resetMeme()
  hideEditor()
  document.querySelector('.gallery-container').classList.remove('hidden')
  document.querySelector('.saved-memes-container').classList.add('hidden')
  var gallery = getGallery()
  var galleryEl = document.querySelector('.gallery')
  var str = gallery.map(
    img =>
      `<img onclick="onImgSelect(${img.id})" class="gallery-img" src="${img.url}" alt="">`
  )
  galleryEl.innerHTML = str.join('')
}

function hideEditor() {
  document.querySelector('.editor-container').classList.add('hidden')
  document.querySelector('.filler').classList.add('hidden')
}

function showEditor() {
  document.querySelector('.filler').classList.remove('hidden')
  document.querySelector('.editor-container').classList.remove('hidden')
}

function onImgSelect(imgId, memeId) {
  onCloseModal()
  const savedMemesEl = document.querySelector('.saved-memes-container')
  const memeIndex = gSavedMemes.findIndex(meme => meme.memeId === memeId)
  const savedMeme = gSavedMemes[memeIndex]
  const defaultMeme = getMeme()

  setImg(imgId)
  if (savedMemesEl.classList.contains('hidden')) {
    renderMeme(defaultMeme)
  } else {
    renderMeme(savedMeme)
    gMeme = gSavedMemes[memeIndex]
  }
  document.querySelector('.saved-memes-container').classList.add('hidden')
  showEditor()
  document.querySelector('.gallery-container').classList.add('hidden')
}

function onOpenModal() {
  // document.querySelector('.modal').style.display = 'block'
  document.querySelector('.modal').style.opacity = '1'
  document.querySelector('.modal').style.zIndex = '1'
}

function onCloseModal() {
  document.querySelector('.modal').style.opacity = '0'
  document.querySelector('.modal').style.zIndex = '-1'
}
