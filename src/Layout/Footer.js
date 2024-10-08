import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { answersAtom, correctBoardAtom, isPlayAtom, levelAtom, playTimeAtom, remainingCountsAtom, selectedCellAtom, wrongCountAtom } from "../Recoil/SudokuAtom";
import classNames from "classnames";
import sudoku from "../Function/sudoku";

function Footer () {

    const remainingCounts = useRecoilValue(remainingCountsAtom)
    const remainingCountsEntries = Object.entries(remainingCounts)
    const setCorrectBoard = useSetRecoilState(correctBoardAtom)
    const setWrongCount = useSetRecoilState(wrongCountAtom)
    const setLevel = useSetRecoilState(levelAtom)
    const setPlayTime = useSetRecoilState(playTimeAtom)
    const [answers, setAnwsers] = useRecoilState(answersAtom)
    const [selectedCell, setSelectedCell] = useRecoilState(selectedCellAtom)
    const [isPlay, setIsPlay] = useRecoilState(isPlayAtom)


    const newGameStarter = () => {
        setCorrectBoard(sudoku())
        setAnwsers({})
        setSelectedCell('')
        setWrongCount(0)
        setPlayTime(0)
        if(!isPlay){
            setIsPlay(true)
        }
    }

    const levelSelector = (e) => {
        if(e.target.tagName !== 'SPAN') return
        setLevel(e.target.dataset.level)
        newGameStarter()
    }

    const sendNumber = (e) => {
        setAnwsers({...answers, [selectedCell] : +e.target.innerText})
    }

    return(
        <footer>
            <div className="number-box">
                {remainingCountsEntries.map((entry,idx)=> {
                    return (
                        <div className="remain-number" key={idx}>
                            <p onClick={sendNumber} className={classNames({finish : entry[1] === 0})}>{entry[0]}</p>
                            <span>{entry[1]}</span>
                        </div>
                    )
                })}
            </div>
            <div id="btn-box">
                <button onClick={newGameStarter}>새게임</button>
            </div>
            <div className="level-selector" onClick={levelSelector}>
                <span data-level={10}>순한맛</span>
                <span data-level={20}>중간맛</span>
                <span data-level={30}>보통맛</span>
                <span data-level={40}>매콤한맛</span>
                <span data-level={50}>핫한맛</span>
            </div>
        </footer>
    )
}

export default Footer