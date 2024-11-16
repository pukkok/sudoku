const buildHeader = (time= 0) => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  let viewer = null
  let timer = null
  
  timer = setInterval(() => {
    console.log('동작')
    viewer = timeViewer(time)
  }, 1000)

  const chanceP = document.createElement('p')
  chanceP.innerText = '기회'
  const timerP = document.createElement('p')
  timerP.innerText = `시간 : ${viewer}`

  
  header.append(chanceP, timerP)

  return header
}

function timeViewer(time) {
  let min = Math.floor(time / 60)
  let sec = time % 60
  if(sec<10) sec = '0' + sec
  if(min<10) min = '0' + min
  return `${min}:${sec}`
}

export default buildHeader