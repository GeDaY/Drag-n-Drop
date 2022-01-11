import { DragDrop } from './dragDrop'

class Sticker {
  data = {
    // id: new Date().getTime(),
    content: 'Hello world!',
  }

  constructor(containerElement) {
    this.containerElement = containerElement

    this.init()
  }

  init() {
    this.render()
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleClickSaveButton = this.handleClickSaveButton.bind(this)
    this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this)

    this.stickerElement.addEventListener('click', this.handleClickSaveButton)
    this.stickerElement.addEventListener('click', this.handleClickDeleteButton)
  }

  handleDoubleClick({ currentTarget }) {
    currentTarget.classList.add('sticker_edit')
  }

  handleClickSaveButton(event) {
    const { target } = event

    if (target.dataset.role === 'save') {
      const editedContent =
        this.stickerElement.querySelector('[name="content"]').value

      this.data.content = editedContent

      this.update()
    }
  }

  handleClickDeleteButton(event) {
    const { target } = event

    if (target.dataset.role === 'delete') {
      this.stickerElement.remove()
    }
  }

  getTemplate() {
    return `
		<div class="sticker__content">${this.data.content}</div>
		
		<button type="button" data-role="delete" class="button_delete">
    <svg class="pe-none" width="16" height="16"><use href="#trash"/></svg>
    </button>

		<form class="sticker__form">
			<textarea name="content">${this.data.content}</textarea>
			<button type="button" data-role="save" class="button_save">
      <svg class="pe-none" width="16" height="16"><use href="#save"/></svg>
      </button>
			</form>
		`
  }

  render() {
    this.stickerElement = document.createElement('div')
    this.stickerElement.classList.add('sticker')
    // this.stickerElement.setAttribute('id', this.data.id)

    this.stickerElement.addEventListener('dblclick', this.handleDoubleClick)
    new DragDrop(this.stickerElement)

    const template = this.getTemplate()
    this.stickerElement.innerHTML = template

    this.containerElement.append(this.stickerElement)
  }

  update() {
    const template = this.getTemplate()
    this.stickerElement.innerHTML = template

    this.stickerElement.classList.remove('sticker_edit')
  }
}

export { Sticker }
