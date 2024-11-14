import buildMain from './Layout/Main.js'
import buildFooter from './Layout/Footer.js';

import sudoku from './utils/sudoku.js'
import makeBlankBoard from './utils/level.js'
import selectedCell from './utils/selectCell.js';
import extractRemainBlankCount from './utils/remainBlank.js';

const header = document.querySelector('header')

function starter() {
  // 새로운 보드 생성
  const newBoard = sudoku()
  // 블랭크 보드로 변경
  const blankBoard = makeBlankBoard(newBoard, 10)
  // 스도쿠 보드를 화면에 생성
  const remainBlankCounts = extractRemainBlankCount(blankBoard)
  
  // 스도쿠 박스 레이아웃 생성
  buildMain(blankBoard)
  buildFooter(remainBlankCounts)

  selectedCell(newBoard, remainBlankCounts)
}

starter()