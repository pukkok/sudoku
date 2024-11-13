const buildHeader = () => {
  const header = document.createElement('header')
  const chanceP = document.createElement('p')
  chanceP.innerText = '기회'
  const timerP = document.createElement('p')
  timerP.innerText = '시간'

  header.appendChild(chanceP, timerP)

  return header
}

export default buildHeader