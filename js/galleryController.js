'use strict'

let gFilterBy = { txt: '' }

function renderGallery() {
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
  const savedMemesEl = document.querySelector('.saved-memes-container')
  const memeIndex = gSavedMemes.findIndex(meme => meme.memeId === memeId)
  const savedMeme = gSavedMemes[memeIndex]
  const defaultMeme = getMeme()

  setImg(imgId)
  if (savedMemesEl.classList.contains('hidden')) {
    renderMeme(defaultMeme)
  } else {
    renderMeme(savedMeme)
  }
  document.querySelector('.saved-memes-container').classList.add('hidden')
  showEditor()
  document.querySelector('.gallery-container').classList.add('hidden')
}
