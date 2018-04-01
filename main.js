let elements = {
  fontSize: new Section('Font size'),
  backgroundColor: new Section('Background color')
}

function Section (name) {
  this.name = name
  this.coins = 0
  this.buildings = [
    {
      baseCost: 1e1,
      gain: 1e0,
      bought: 0
    },
    {
      baseCost: 1e2,
      gain: 1.5e1,
      bought: 0
    },
    {
      baseCost: 5e3,
      gain: 1e3,
      bought: 0
    },
    {
      baseCost: 1e5,
      gain: 2e4,
      bought: 0
    },
    {
      baseCost: 1e7,
      gain: 3.5e6,
      bought: 0
    },
    {
      baseCost: 1e9,
      gain: 1e8,
      bought: 0
    }
  ]


  this.getCoins = () => {
    return this.coins
  }

  this.setData = (data) => {
    this.name = data.name
    this.coins = data.coins
    this.buildings = data.buildings
  }

  this.getData = () => {
    return {
      name: this.name,
      coins: this.coins,
      buildings: this.buildings
    }
  }

  this.manualCoins = () => {
    this.coins++
  }

  this.buyBuilding = (which) => {
    const actualCost = Math.round(this.buildings[which].baseCost * Math.pow(1.1, this.buildings[which].bought))
    if (this.coins >= actualCost) {
      this.coins -= actualCost
      this.buildings[which].bought++
    }
  }

  this.gatherCoins = () => {
    let gain = 0
    for (let i = 0; i < this.buildings.length; i++) {
      gain += (this.buildings[i].gain * this.buildings[i].bought)
    }
    this.coins += gain
  }

  this.updateCoins = () => {
    const coinsAmountId = this.name.split(' ').join('-') + '-coins'
    document.getElementById(coinsAmountId).innerText = this.coins
  }

  this.updateBought = () => {
    for (let i = 0; i < this.buildings.length; i++) {
      const boughtAmountId = this.name.split(' ').join('-') + '-' + i + '-bought'
      document.getElementById(boughtAmountId).innerText = this.buildings[i].bought
    }
  }

  this.updateCost = () => {
    for (let i = 0; i < this.buildings.length; i++) {
      const costValueId = this.name.split(' ').join('-') + '-' + i + '-cost'
      const actualCost = Math.round(this.buildings[i].baseCost * Math.pow(1.1, this.buildings[i].bought))
      document.getElementById(costValueId).innerText = actualCost
    }
  }

  this.updateInfo = () => {
    this.updateCoins()
    this.updateBought()
    this.updateCost()
  }

  this.generateHeader = (parent) => {
    const header = document.createElement('div')
    header.classList.add('header')
    const text = document.createTextNode(this.name)
    header.appendChild(text)

    parent.appendChild(header)
  }

  this.generateClickPart = (parent) => {
    const container = document.createElement('div')

    const description = document.createElement('div')

    const descriptionText = document.createTextNode(this.name + ' coins: ')
    const coinsAmount = document.createElement('span')
    coinsAmount.innerText = '0'
    const coinsAmountId = this.name.split(' ').join('-') + '-coins'
    coinsAmount.setAttribute('id', coinsAmountId)
    description.appendChild(descriptionText)
    description.appendChild(coinsAmount)
    container.appendChild(description)

    const button = document.createElement('div')
    button.classList.add('button')
    const buttonText = document.createTextNode('Beautify')
    button.onclick = this.manualCoins
    button.appendChild(buttonText)
    container.appendChild(button)

    parent.appendChild(container)
  }

  this.generateBuildingPart = (parent) => {
    const container = document.createElement('div')

    for (let i = 0; i < this.buildings.length; i++) {
      const building = document.createElement('div')

      const descriptionBought = document.createElement('div')
      const boughtText = document.createTextNode('Owned buildings: ')
      const boughtAmount = document.createElement('span')
      boughtAmount.innerText = '0'
      const boughtAmountId = this.name.split(' ').join('-') + '-' + i + '-bought'
      boughtAmount.setAttribute('id', boughtAmountId)
      descriptionBought.appendChild(boughtText)
      descriptionBought.appendChild(boughtAmount)
      building.appendChild(descriptionBought)

      const descriptionCost = document.createElement('div')
      const costText = document.createTextNode('Building cost: ')
      const costValue = document.createElement('span')
      costValue.innerText = '0'
      const costValueId = this.name.split(' ').join('-') + '-' + i + '-cost'
      costValue.setAttribute('id', costValueId)
      descriptionCost.appendChild(costText)
      descriptionCost.appendChild(costValue)
      building.appendChild(descriptionCost)

      const descriptionGain = document.createElement('div')
      const gainText = document.createTextNode('Building gain: +' + this.buildings[i].gain + ' per second')
      descriptionGain.appendChild(gainText)
      building.appendChild(descriptionGain)

      const button = document.createElement('div')
      button.classList.add('button')
      const buttonText = document.createTextNode('Buy!')
      button.onclick = () => {
        this.buyBuilding(i)
      }
      button.appendChild(buttonText)
      building.appendChild(button)

      container.appendChild(building)
    }

    parent.appendChild(container)
  }

  this.generateDOMStructure = () => {
    const container = document.createElement('div')
    container.classList.add('section')
    this.generateHeader(container)
    this.generateClickPart(container)
    this.generateBuildingPart(container)
    return container
  }
}

function showHelloMessage () {
  const parent = document.getElementById('parent')

  const child = document.createElement('div')
  child.setAttribute('id', 'hello-message')

  const childParagraph = document.createElement('p')
  const paragraphText = document.createTextNode('Hello. Your goal is to make this game as beautiful as possible.')
  childParagraph.appendChild(paragraphText)

  const childButton = document.createElement('div')
  childButton.classList.add('button')
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

function gotIt () {
  removeHelloMessage()
  populateScreen()
  updateGameState()
  autoSave()
  requestAnimationFrame(updateGameScreen)
}

function optionsSection (parent) {
  const container = document.createElement('div')

  const header = document.createElement('div')
  header.classList.add('header')
  const headerText = document.createTextNode('Options')
  header.appendChild(headerText)
  container.appendChild(header)

  const resetButton = document.createElement('div')
  resetButton.classList.add('button')
  const resetButtonText = document.createTextNode('Reset game')
  resetButton.appendChild(resetButtonText)
  resetButton.onclick = resetGame
  container.appendChild(resetButton)

  parent.appendChild(container)
}

function updateHeaderSize () {
  const multiplier = Math.log10(elements.fontSize.getCoins())
  const size = 1 + (multiplier !== -Infinity ? multiplier : 0)
  const headers = document.querySelectorAll('.header')
  headers.forEach(element => {
    element.setAttribute('style', 'font-size: ' + size + 'rem;')
  })
}

function updateBackgroundColor () {
  const ratio = Math.log10(elements.backgroundColor.getCoins()) / Math.log10(1e10)
  const alpha = (ratio !== -Infinity ? ratio : 0)
  const hslaBody = 'hsla(179, 93%, 74%, ' + alpha + ')'
  document.body.setAttribute('style', 'background: ' + hslaBody + ';')
  const buttons = document.querySelectorAll('.button')
  const hslaButton = 'hsla(59, 86%, 61%, ' + alpha + ')'
  buttons.forEach(element => {
    element.setAttribute('style', 'background: ' + hslaButton + ';')
  })
}

function populateScreen () {
  const parent = document.getElementById('parent')

  parent.appendChild(elements.fontSize.generateDOMStructure())
  parent.appendChild(elements.backgroundColor.generateDOMStructure())

  optionsSection(parent)
}

function updateGameScreen () {
  for (let key in elements) {
    elements[key].updateInfo()
  }
  updateHeaderSize()
  updateBackgroundColor()
  updateNewFont()
  updateNewColor()
  requestAnimationFrame(updateGameScreen)
}

function updateGameState () {
  let previousTime = Date.now()
  setInterval(() => {
    for (let key in elements) {
      elements[key].gatherCoins()
    }
  }, 1000)
}

function updateNewFont () {
  if (elements.fontSize.coins > 1e7 && !document.body.classList.contains('new-font')) {
    document.body.classList.add('new-font')
  }
}

function updateNewColor () {
  if (elements.backgroundColor.coins > 1e7 && !document.body.classList.contains('new-color')) {
    document.body.classList.add('new-color')
  }
}

function autoSave () {
  setInterval(() => {
    saveGame()
  }, 10000)
}

function saveGame () {
  let gameData = {}
  for (let key in elements) {
    gameData[key] = elements[key].getData()
  }
  localStorage.setItem('prettifier', JSON.stringify(gameData))
}

function loadGame () {
  let gameData = JSON.parse(localStorage.getItem('prettifier'))
  for (let key in gameData) {
    elements[key].setData(gameData[key])
  }
}

function resetGame () {
  localStorage.removeItem('prettifier')
  window.location.reload()
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('If you have problems with your game you can try restarting progress with \'resetGame()\' function.')
  if (localStorage.getItem('prettifier') === null) {
    showHelloMessage()
  } else {
    loadGame()
    populateScreen()
    updateGameState()
    autoSave()
    updateGameScreen()
  }
}, false)
