import React from "react";
import { useRecoilValue } from "recoil";
import { remainingCountsAtom } from "../Recoil/SudokuAtom";

function Footer () {

    const remainingCounts = useRecoilValue(remainingCountsAtom)
    const remainingCountsEntries = Object.entries(remainingCounts)

    return(
        <div>
            <div id="btn-box">
                <button>다시뽑기</button>
                <button>난이도 선택</button>
            </div>
            <p>남은 개수</p>
            <div className="number-box">
                {remainingCountsEntries.map((entry,idx)=> {
                    return (<div className="remain-number" key={idx}>
                            <p>{entry[0]}</p>
                            <span>{entry[1]}</span>
                        </div>) 
                })}
            </div>
        </div>
    )
}

export default Footer