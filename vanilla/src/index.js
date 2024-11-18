import {gameTimer, remainChance} from './Layout/Header.js';
import buildMain from './Layout/Main.js'
import buildFooter from './Layout/Footer.js';

import sudoku from './utils/sudoku.js'
import makeBlankBoard from './utils/level.js'
import selectedCell from './utils/selectCell.js';
import extractRemainBlankCount from './utils/remainBlank.js';

let chance = 0
let levels = [10, 20, 30]
let time = 0
let timer = null

function starter() {
  reset()

  // 새로운 보드 생성
  const newBoard = sudoku()
  // 블랭크 보드로 변경
  const blankBoard = makeBlankBoard(newBoard, levels[0])
  // 스도쿠 보드를 화면에 생성
  const remainBlankCounts = extractRemainBlankCount(blankBoard)
  
  timer = setInterval(() => {
    time++
    gameTimer(time)
  }, 1000)

  buildMain(blankBoard)
  buildFooter(remainBlankCounts)

  selectedCell(newBoard, remainBlankCounts, chance)

}

starter()

function reset () {
  clearInterval(timer) // 기존 타이머 제거
  timer = null // 기존 타이머 제거
  time = 0 // 시간 초기화
  chance = 0 // 기회 초기화
  remainChance(chance)
  gameTimer(time) // 초기 UI 갱신
}

function pause () {
  if(timer){
    clearInterval(timer)
    timer = null
  } else {
    timer = setInterval(() => {
      time++
      gameTimer(time)
    }, 1000)
  }
}

const resetBtn = document.getElementById('starter')
resetBtn.addEventListener('click', starter)

const pauseBtn = document.getElementById('pause')
pauseBtn.addEventListener('click', pause)

var b
let a
console.log(a, b)