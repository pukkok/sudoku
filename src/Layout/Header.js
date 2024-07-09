import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playTimeAtom, wrongCountAtom } from "../Recoil/SudokuAtom";

function Header () {
    
    const wrongCount = useRecoilValue(wrongCountAtom)
    const [playTime, setPlayTime] = useRecoilState(playTimeAtom)
    const [timeViewer, setTimeViewer] = useState('00 : 00')
    const wrongStyle = {
        color : wrongCount === 1 ? 'orange' : wrongCount === 0 ? 'green' : 'red',
        fontWeight : wrongCount !==0 && 'bold'
    }

    useEffect(() => {
        let timer
        timer = setInterval(() => {
            setPlayTime(prev => prev+1)
        }, 1000);

        let min = Math.floor(playTime / 60)
        let sec = playTime % 60
        if(sec<10) sec = '0' + sec
        if(min<10) min = '0' + min
        setTimeViewer(`${min}:${sec}`)

        return () => {
            clearInterval(timer)
        }
    },[playTime])

    return(
        <header>
            <p>기회 <span style={wrongStyle}>{wrongCount}/3</span></p>
            <p>시간 <span>{timeViewer}</span></p>
        </header>
    )
}
export default Header