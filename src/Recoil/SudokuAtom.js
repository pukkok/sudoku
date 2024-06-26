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
    default: {1:9, 2:9, 3:9, 4:9, 5:9, 6:9, 7:9, 8:9, 9:9}
})

export {
    correctBoardAtom,
    timerAtom, 
    wrongCountAtom,
    levelAtom,
    remainingCountsAtom
}