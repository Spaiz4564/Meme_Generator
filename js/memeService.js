'use strict'

var gKeywordSearchCountMap = {
  funny: 13,
  pet: 16,
  baby: 11,
  men: 15,
  movies: 14,
  smile: 11,
}
var gSavedMemeCounter = 0
var gImgs = [
  { id: 0, url: 'images/gallery-imgs/1.jpg', keywords: ['funny', 'men'] },
  { id: 1, url: 'images/gallery-imgs/2.jpg', keywords: ['funny', 'pet'] },
  {
    id: 2,
    url: 'images/gallery-imgs/3.jpg',
    keywords: ['funny', 'pet', 'baby'],
  },
  { id: 3, url: 'images/gallery-imgs/4.jpg', keywords: ['funny', 'pet'] },
  { id: 4, url: 'images/gallery-imgs/5.jpg', keywords: ['funny', 'baby'] },
  { id: 5, url: 'images/gallery-imgs/6.jpg', keywords: ['funny', 'men'] },
  { id: 6, url: 'images/gallery-imgs/7.jpg', keywords: ['funny', 'baby'] },
  { id: 7, url: 'images/gallery-imgs/8.jpg', keywords: ['funny', 'men'] },
  {
    id: 8,
    url: 'images/gallery-imgs/9.jpg',
    keywords: ['funny', 'baby', 'smile'],
  },
  {
    id: 9,
    url: 'images/gallery-imgs/10.jpg',
    keywords: ['funny', 'men', 'smile'],
  },
  { id: 10, url: 'images/gallery-imgs/11.jpg', keywords: ['funny', 'men'] },
  { id: 11, url: 'images/gallery-imgs/12.jpg', keywords: ['funny', 'men'] },
  { id: 12, url: 'images/gallery-imgs/13.jpg', keywords: ['funny', 'men'] },
  {
    id: 13,
    url: 'images/gallery-imgs/14.jpg',
    keywords: ['funny', 'men', 'movies'],
  },
  {
    id: 14,
    url: 'images/gallery-imgs/15.jpg',
    keywords: ['funny', 'men', 'movies'],
  },
  {
    id: 15,
    url: 'images/gallery-imgs/16.jpg',
    keywords: ['funny', 'men', 'movies'],
  },
  {
    id: 16,
    url: 'images/gallery-imgs/17.jpg',
    keywords: ['funny', 'men', 'movies'],
  },
  { id: 17, url: 'images/gallery-imgs/18.jpg', keywords: ['funny', 'men'] },
]
var gMeme = {
  memeId: makeId(2),
  isSecondLineAdded: false,
  imgId: 0,
  lineIdx: 0,
  lineFocus: false,
  lines: [
    {
      isUpperCased: false,
      txt: 'It is wednesday  my dudes',
      height: 20,
      width: 50 + '%',
      size: 22,
      font: 'impact',
      color: 'white',
    },
  ],
}

function addText(height) {
  const txt = {
    isUpperCased: false,
    txt: 'i love dank memes',
    height: height,
    width: gElCanvas.width / 2,
    size: 22,
    font: 'impact',
    color: 'white',
  }
  gMeme.lines.push(txt)
}

function setImg(id) {
  gMeme.imgId = id
}

function getMeme() {
  return gMeme
}

function getKeyWords() {
  return gKeywordSearchCountMap
}

function getGallery() {
  if (!gFilterBy.txt) return gImgs
  else {
    return gImgs.filter(img =>
      img.keywords.some(word => word.includes(gFilterBy.txt))
    )
  }
}

function setLineTxt() {
  var txtVal = document.querySelector('.txt-input').value
  if (!gMeme.lines[gMeme.lineIdx]) return
  gMeme.lines[gMeme.lineIdx].txt = txtVal
  renderMeme(gMeme)
}

function resetMeme() {
  gMeme = {
    memeId: makeId(2),
    isSecondLineAdded: false,
    imgId: 0,
    lineIdx: 0,
    lineFocus: false,
    lines: [
      {
        isUpperCased: false,
        txt: 'It is wednesday  my dudes',
        height: 20,
        width: gElCanvas.width / 2,
        size: 22,
        font: 'impact',
        color: 'white',
      },
    ],
  }
  document.querySelector('.txt-input').value = ''
}
