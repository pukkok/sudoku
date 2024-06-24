const root = document.getElementById('root')

const section = document.createElement('section')

const box = document.createElement('div')
box.className = 'sudoku-box'

const optionBox = document.createElement('div')
optionBox.className = 'option-box'

const button = document.createElement('button')
button.innerText = '다시 뽑기'

optionBox.append(button)
let gridSize = 9


function randomNumber(){
  return Math.floor(Math.random()*9)+1
}

const standardBox = [
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8]
]

let board = JSON.parse(JSON.stringify(standardBox))
function boardReset (){
  board.forEach(line => {
      line.fill(0)
  })
}
boardReset()

let a = []
function makeSudoku(board){    
    for(let row=0; row<gridSize; row++){
        for(let col=0; col<gridSize; col++){
            let num = randomNumber()
            if(board[row][col] === 0){
                for(let x = 0; x < 9; x++){
                  
                    if(isValidSudoku(board, row, col, num)){ // 유효성 검사
                        board[row][col] = num
                        
                        if(makeSudoku(board)){
                            return true
                        }
                        
                        board[row][col] = 0
                    }
                  
                }
                return false // 더이상 돌릴 수 없다.
            }
        }
    }
    return true
}


function isValidSudoku(board, row, col, num){
  
  // row, col 확인
    for(let i=0; i<gridSize; i++){
        if(board[row][i] === num || board[i][col] === num){
            return false
        }
    }
    
    // 3 x 3 배열 확인
    const startRow = Math.floor(row/3)*3
    const startCol = Math.floor(col/3)*3
    
    for(let i=startRow; i<startRow+3; i++){
        for(let j=startCol; j<startCol+3; j++){
            if(board[i][j] === num){
                return false
            }
        }
    }
    
    return true
}

makeSudoku(board)

let numberIncludeCheck = JSON.parse(JSON.stringify(board))
numberIncludeCheck.forEach(line => {
    line.sort((a,b) => a-b)
})
console.log(numberIncludeCheck)

let secondCheck = numberIncludeCheck.filter(data => data === 0)
console.log(secondCheck)

function initNumber () {
  for(let x=0; x<9; x++){
    for(let y=0; y<9; y++){
      const data = document.createElement('div')
      data.className = `data ${y}-${x}`
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
      box.append(data)
    }
  }
  return box 
}
initNumber()

root.append(box ,optionBox)

button.addEventListener('click', ()=>{
  boardReset()
  makeSudoku(board)
  box.innerHTML =''
  initNumber()
})