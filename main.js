//TODO: Move data somewhere else.
let data = {
  fontCoins: 0
}

function showHelloMessage () {
  const parent = document.getElementById('parent')

  const child = document.createElement('div')
  child.setAttribute('id', 'hello-message')

  const childParagraph = document.createElement('p')
  const paragraphText = document.createTextNode('Hello. Your goal is to make this game as beautiful as possible.')
  childParagraph.appendChild(paragraphText)

  const childButton = document.createElement('div')
  childButton.setAttribute('class', 'button')
  childButton.onclick = gotIt
  const buttonText = document.createTextNode('Got it!')
  childButton.appendChild(buttonText)

  child.appendChild(childParagraph)
  child.appendChild(childButton)
  parent.appendChild(child)
}

function removeHelloMessage () {
  const parent = document.getElementById('parent')
  const child = document.getElementById('hello-message')
  parent.removeChild(child)
}

function addFontCoins () {
  data.fontCoins += 1
}

function fontSizeContainer (parent) {
  const container = document.createElement('div')

  const header = document.createElement('div')
  header.setAttribute('class', 'header')
  const headerText = document.createTextNode('Font size')
  header.appendChild(headerText)
  container.appendChild(header)

  const counter = document.createElement('div')
  const counterText = document.createTextNode('Font coins: ')
  const counterSpan = document.createElement('span')
  counterSpan.setAttribute('id', 'font-size-amount')
  const counterSpanText = document.createTextNode('0')
  counterSpan.appendChild(counterSpanText)
  counter.appendChild(counterText)
  counter.appendChild(counterSpan)
  container.appendChild(counter)

  const button = document.createElement('div')
  button.setAttribute('class', 'button')
  const buttonText = document.createTextNode('Beautify')
  button.appendChild(buttonText)
  button.onclick = addFontCoins
  container.appendChild(button)

  parent.appendChild(container)
}

function optionsSection (parent) {
  const container = document.createElement('div')

  const header = document.createElement('div')
  header.setAttribute('class', 'header')
  const headerText = document.createTextNode('Options')
  header.appendChild(headerText)
  container.appendChild(header)

  const saveButton = document.createElement('div')
  saveButton.setAttribute('class', 'button')
  const saveButtonText = document.createTextNode('Save game')
  saveButton.appendChild(saveButtonText)
  saveButton.onclick = saveGame
  container.appendChild(saveButton)

  parent.appendChild(container)
}

function populateScreen () {
  const parent = document.getElementById('parent')

  fontSizeContainer(parent)
  optionsSection(parent)
}

function gotIt () {
  removeHelloMessage()
  populateScreen()
  requestAnimationFrame(update)
}

function updateFontCoinsCounter (fontCoins) {
  document.getElementById('font-size-amount').innerText = data.fontCoins
  updateHeaderSize(fontCoins)
}

function updateHeaderSize (fontCoins) {
  const fontSize = 1 + Math.log10(fontCoins)
  const elementList = document.querySelectorAll('div.header')
  elementList.forEach(element => {
    element.setAttribute('style', 'font-size: ' + fontSize + 'rem;')
  })
}

function update () {
  //TODO: Make an update function.
  updateFontCoinsCounter(data.fontCoins)
  updateHeaderSize(data.fontCoins)
  requestAnimationFrame(update)
}

function saveGame () {
  localStorage.setItem('prettifier', JSON.stringify(data))
}

function loadGame() {
  data = JSON.parse(localStorage.getItem('prettifier'))
  populateScreen()
}

function toggleSecondStage () {
  const root = document.getElementById('root')
  if (!root.classList.contains('second-stage')) {
    root.classList.add('second-stage')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('prettifier') === null) {
    showHelloMessage()
  } else {
    loadGame()
    requestAnimationFrame(update)
  }
}, false)
