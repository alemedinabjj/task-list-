const getBanco = () => {
  const banco = localStorage.getItem('banco')

  if (banco) {
    return JSON.parse(banco)
  } else {
    return []
  }
}

const setBanco = banco => {
  localStorage.setItem('banco', JSON.stringify(banco))
}



const add = () => {
  const input = document.getElementById('input')
  const value = input.value

  if (value) {
    const banco = getBanco()
    banco.push(value)
    setBanco(banco)
    input.value = ''

    render()
  }
}

const remove = index => {
  const banco = getBanco()
  banco.splice(index, 1)
  setBanco(banco)
  render()
}

const edit = index => {
  const banco = getBanco()
  const input = document.getElementById('input')
  input.value = banco[index]
  input.focus()
  input.onblur = () => {
    banco[index] = input.value
    setBanco(banco)
    render()
  }
}

const render = () => {
  const list = document.getElementById('list')
  const banco = getBanco()
  list.innerHTML = ''

  banco.forEach((item, index) => {
    const li = document.createElement('li')
    const checkbox = document.createElement('input')
    const p = document.createElement('p')
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'

    checkbox.type = 'checkbox'

    p.innerHTML = item

    const button = document.createElement('button')

    list.appendChild(li)

    button.innerHTML = 'x'
    button.onclick = () => {
      remove(index)
    }


    checkbox.onclick = () => {
      if (checkbox.checked) {
        p.style.textDecoration = 'line-through'
        p.style.color = 'red'
        banco[index] = p.innerHTML
        setBanco(banco)
      } else {
        p.style.textDecoration = 'none'
        p.style.color = 'black'
        banco[index] = p.innerHTML
        setBanco(banco)
      }
    }

    wrapper.appendChild(checkbox)
    wrapper.appendChild(p)
    li.appendChild(wrapper)

    li.appendChild(button)

    list.appendChild(li)
  })


}

const Enter = event => {
  if (event.keyCode === 13) {
    add()
  }
}

render()

// const addBtn = document.getElementById('add')
// addBtn.onclick = add

window.addEventListener('keydown', Enter)
