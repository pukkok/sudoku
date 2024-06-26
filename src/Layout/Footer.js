import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { correctBoardAtom, remainingCountsAtom } from "../Recoil/SudokuAtom";
import classNames from "classnames";
import sudoku from "../Function/sudoku";

function Footer () {

    const remainingCounts = useRecoilValue(remainingCountsAtom)
    const remainingCountsEntries = Object.entries(remainingCounts)
    const setCorrectBoard = useSetRecoilState(correctBoardAtom)

    const newGameStarter = () => {
        setCorrectBoard(sudoku())
    }

    const levelSelector = () => {
        
    }

    return(
        <div>
            <div id="btn-box">
                <button onClick={newGameStarter}>새게임</button>
                <button onClick={levelSelector}>난이도 선택</button>
            </div>
            <br/>
            <p>남은 개수</p>
            <div className="number-box">
                {remainingCountsEntries.map((entry,idx)=> {
                    return (<div className="remain-number" key={idx}>
                            <p className={classNames({finish : entry[1] === 0})}>{entry[0]}</p>
                            <span>{entry[1]}</span>
                        </div>) 
                })}
            </div>
        </div>
    )
}

export default Footer