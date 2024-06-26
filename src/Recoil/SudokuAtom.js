import { atom } from "recoil";
import sudoku from "../Function/sudoku";

const correctBoardAtom = atom({
    key: 'correctBoard',
    default: sudoku()
})

const timerAtom = atom({
    key: 'timer',
    default : {min: 0, sec: 0}
})

const wrongCountAtom = atom({
    key: 'wrong',
    default: 0
})

const levelAtom = atom({
    key: 'level',
    default: 10
})

const remainingCountsAtom = atom({
    key: 'remain',
    default: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}
})

export {
    correctBoardAtom,
    timerAtom, 
    wrongCountAtom,
    levelAtom,
    remainingCountsAtom
}