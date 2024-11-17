import {gameTimer} from './Layout/Header.js';
import buildMain from './Layout/Main.js'
import buildFooter from './Layout/Footer.js';

import sudoku from './utils/sudoku.js'
import makeBlankBoard from './utils/level.js'
import selectedCell from './utils/selectCell.js';
import extractRemainBlankCount from './utils/remainBlank.js';

let time = 0
let timer = null

function starter() {
  if (timer) {
    clearInterval(timer) // 기존 타이머 제거
    timer = null
    time = 0 // 시간 초기화
    gameTimer(time) // 초기 UI 갱신
  }

  // 새로운 보드 생성
  const newBoard = sudoku()
  // 블랭크 보드로 변경
  const blankBoard = makeBlankBoard(newBoard, 10)
  // 스도쿠 보드를 화면에 생성
  const remainBlankCounts = extractRemainBlankCount(blankBoard)
  
  timer = setInterval(() => {
    time++
    gameTimer(time)
  }, 1000)

  buildMain(blankBoard)
  buildFooter(remainBlankCounts)

  selectedCell(newBoard, remainBlankCounts)

}

starter()

const resetBtn = document.getElementById('starter')
resetBtn.addEventListener('click', starter)