const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
  if (event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', event => {
  event.preventDefault()
  const type = event.target.dataset.type

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
    ? event.target
    : event.target.childern[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
    console.log(event.target)
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent)
  }
})

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')
    const press = document.querySelector('.press')

    // text.addEventListener('click',() => {
    //   text.innerHTML = `<span>copyed</span>`
    // })

    if (isLocked) {
      colors.push(text.textContent)
      return
    }

    const color = isInitial 
    ? colors[index] 
      ?colors[index]
      :chroma.random()
    : chroma.random()

    if (!isInitial) {
      colors.push(color)
    }
    
    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
    setTextColor(press, color)
  })

  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()

  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
  .map(col => col.toString().substring(1))
  .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
    .substring(1)
    .split('-')
    .map(color => "#" + color)
  }
  return []
}

setRandomColors(true)