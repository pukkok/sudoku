import sudoku from './src/sudoku.js'
import buildMatrix from './src/layout.js'

const root = document.getElementById('root')

const newBoard = sudoku()
const sudokuBox = buildMatrix(newBoard)
root.append(sudokuBox)