import '../scss/app.scss'
import 'bootstrap'

import { Sticker } from './sticker'

const containerElem = document.querySelector('#container')
const createStickerButtonElem = document.querySelector('#createStickerButton')

createStickerButtonElem.addEventListener('click', () => {
  new Sticker(containerElem)
})
