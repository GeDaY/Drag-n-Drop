class DragDrop {
  position = {
    top: 'auto',
    left: 'auto',
  }

  shifts = {
    x: 0,
    y: 0,
  }

  constructor(element) {
    this.element = element

    this.init()
  }

  init() {
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    this.element.addEventListener('mousedown', this.handleMouseDown)
  }

  handleMouseDown({ clientY, clientX }) {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)

    this.element.classList.add('sticker_active')

    this.calcShifts(clientY, clientX)
    this.setPosition(clientY, clientX)
  }

  handleMouseMove({ clientY, clientX }) {
    this.setPosition(clientY, clientX)
  }

  handleMouseUp({ clientY, clientX }) {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)

    this.element.classList.remove('sticker_active')

    this.setPosition(clientY, clientX)
  }

  calcShifts(y, x) {
    const { top, left } = this.element.getBoundingClientRect()

    this.shifts.y = y - top + 10
    this.shifts.x = x - left + 10
  }

  setPosition(top, left) {
    this.position.top = top - this.shifts.y
    this.position.left = left - this.shifts.x

    this.element.style.top = this.position.top + 'px'
    this.element.style.left = this.position.left + 'px'
  }
}

export { DragDrop }
