function makeBlankBoard (board, difficulty=10) {

  const blankBoard = JSON.parse(JSON.stringify(board))

  function randomNumber(){
    return Math.floor(Math.random()*9)
  }
  
  let checkArr = []
  while(checkArr.length < difficulty){
    let x = randomNumber()
    let y = randomNumber()
    if(!checkArr.includes(`${x},${y}`)){
      checkArr.push(`${x},${y}`)
      blankBoard[x][y] = ''
    }
  }

  return blankBoard
}

export default makeBlankBoard