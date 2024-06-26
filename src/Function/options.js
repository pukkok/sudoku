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
        data.className = `cell`
        const input = document.createElement('input')
        input.className = `${y+1}-${x+1}`

        if(x<3){
            if(y<3){
                input.classList.add('box1')
            }else if(y<6){
                input.classList.add('box2')
            }else{
                input.classList.add('box3')
            }
        }else if(x<6){
            if(y<3){
                input.classList.add('box4')
            }else if(y<6){
                input.classList.add('box5')
            }else{
                input.classList.add('box6')
            }
        }else{
            if(y<3){
                input.classList.add('box7')
            }else if(y<6){
                input.classList.add('box8')
            }else{
                input.classList.add('box9')
            }
        }

        if(x===0 || x===3 || x===6){
            data.classList.add('top')
        }
        if(x===8){
            data.classList.add('bottom')
        }
        if(y===0 || y===3 || y=== 6){
            data.classList.add('left')
        }
        if(y===8){
            data.classList.add('right')
        }
  
        input.value = `${board[x][y]}`
        if(input.value){
            input.readOnly=true
        }
    
        data.append(input)
        sudokuBox.append(data)
      }
    }
    return sudokuBox
}

(function firstStart () {
    initNumber(blankBoard)
    startGame()
})()

let minutes = 0
let seconds = 0
const timerStarter = () => {
    const timer = document.querySelector('.timer')
    let min
    let sec
    setInterval(() => {
        seconds++

        if(seconds===60){
            seconds = 0
            minutes++
        }

        if(seconds<10){
            sec = '0' + seconds
        }else{
            sec = seconds
        }
        
        if(minutes<10){
            min = '0' + minutes
        }else{
            min = minutes
        }

        timer.innerText = `${min}:${sec}`
    }, 1000);

}

timerStarter()



btnBox.querySelector('button').addEventListener('click', ()=>{
    const newBoard = sudoku()
    const newBlankBoard = makeBlankBoard(newBoard, level.level1)
    sudokuBox.innerHTML =''
    initNumber(newBlankBoard)
    startGame()
})

function startGame () {
    const inputs = document.querySelectorAll('.cell input')
    // 클릭했을때
    const focusInput = (e) => {
        inputs.forEach(input => {
            if( // 같은 라인, 같은 박스
                input.classList[0].split('-')[0] === e.target.classList[0].split('-')[0] || 
                input.classList[0].split('-')[1] === e.target.classList[0].split('-')[1] ||
                input.classList[1] === e.target.classList[1]
            ){
                input.style.backgroundImage = 'linear-gradient(rgba(249, 95, 213, 0.2), rgba(249, 95, 213, 0.2))'
            }else{
                input.style.backgroundImage = ''
            }
    
            if(input.value === e.target.value){
                if(input.value){
                    input.style.backgroundImage = 'linear-gradient(rgba(249, 95, 213, 0.6), rgba(249, 95, 213, 0.6))'
                }else{
                    e.target.style.backgroundImage = 'linear-gradient(rgba(249, 95, 213, 0.6), rgba(249, 95, 213, 0.6))'
                }
            }
        })
    }

    const wrong = document.querySelector('.wrong')
    let chance = 0
    // 정답 입력할때
    const answerCheck = (e) => {
        if(e.target.value.length>1){
            // 1글자만 입력되도록 변경
            e.target.value = e.target.value.charAt(1)
        }
        const coords = e.target.classList[0].split('-')
        const answer = answerBoard[coords[1]-1][coords[0]-1]
        
        if(+e.target.value === answer){
            e.target.style.color = 'blue'
        }else{
            e.target.style.color = 'red'
            chance++
            wrong.innerText = chance
            if(+chance === 3){
                alert('GAME OVER!')
            }
        }
    }
    
    inputs.forEach(input => {
        input.addEventListener('click', focusInput)
        input.addEventListener('input', answerCheck)
    })
    
    const answerFlatten = answerBoard.reduce((acc, r) => {
       return acc = [...acc, ...r]
    },[])
    const correctStr = answerFlatten.join('')
    const answerStr = Array.from(inputs).map(input => {
        return input.value
    }).join('')
    
    if(correctStr === answerStr){
        alert('완료!')
    }
}