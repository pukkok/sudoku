const gameTimer = (time = 0) => {
  const timerP = document.getElementById('timer')
  let currentTime = timeViewer(time)

  timerP.innerHTML = `시간 : ${currentTime}`
}

function timeViewer(time) {
  let min = Math.floor(time / 60)
  let sec = time % 60
  if(sec<10) sec = '0' + sec
  if(min<10) min = '0' + min
  return `${min}:${sec}`
}

export {gameTimer}