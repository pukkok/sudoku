import sudoku from './sudoku.js'

const sudokuBox = document.getElementById('sudoku-box')
const btnBox = document.getElementById('btn-box')

const answerBoard = sudoku()
let board = JSON.parse(JSON.stringify(answerBoard))

const level = { level1 : 10, level2 : 20, level3 : 30 }

const makeBlankBoard = (board, difficulty) => {
    const blankBoard = [...board]
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
const blankBoard = makeBlankBoard(board, level.level1)

function initNumber (board) {
    for(let x=0; x<9; x++){
      for(let y=0; y<9; y++){
        const data = document.createElement('div')
        data.className = `data ${y+1}-${x+1}`
        const input = document.createElement('input')
  
        if(x<3){
          if(y<3){
              data.classList.add('small-box1') 
          }else if(y<6){
              data.classList.add('small-box2')
          }else{
              data.classList.add('small-box3')
          }
        }else if(x<6){
          if(y<3){
              data.classList.add('small-box4') 
          }else if(y<6){
              data.classList.add('small-box5')
          }else{
              data.classList.add('small-box6')
          }
        }else{
          if(y<3){
              data.classList.add('small-box7') 
          }else if(y<6){
              data.classList.add('small-box8')
          }else{
              data.classList.add('small-box9')
          }
        }
  
        input.value = `${board[x][y]}`
        data.append(input)
        sudokuBox.append(data)
      }
    }
    return sudokuBox
}
initNumber(blankBoard)
  
btnBox.querySelector('button').addEventListener('click', ()=>{
    const newBoard = sudoku()
    const newBlankBoard = makeBlankBoard(newBoard, level.level1)
    sudokuBox.innerHTML =''
    initNumber(newBlankBoard)
})