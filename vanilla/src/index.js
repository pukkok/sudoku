import buildMatrix from './Layout/boxLayout.js'
import buildFooter from './Layout/Footer.js';

import sudoku from './utils/sudoku.js'
import makeBlankBoard from './utils/level.js'
import selectedCell from './utils/selectCell.js';
import extractRemainBlankCount from './utils/remainBlank.js';

const root = document.getElementById('root')
// 새로운 보드 생성
const newBoard = sudoku()
// 블랭크 보드로 변경
const blankBoard = makeBlankBoard(newBoard, 10)
// 스도쿠 보드를 화면에 생성
const remainBlankCounts = extractRemainBlankCount(blankBoard)

const sudokuBox = buildMatrix(blankBoard)
const footer = buildFooter(remainBlankCounts)



const container = document.createElement('div')
container.className = 'container'
container.append(sudokuBox, footer)
root.append(container)

selectedCell(newBoard)