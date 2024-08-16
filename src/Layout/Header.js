import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlayAtom, playTimeAtom, wrongCountAtom } from "../Recoil/SudokuAtom";

function Header () {
    
    const wrongCount = useRecoilValue(wrongCountAtom)
    const [playTime, setPlayTime] = useRecoilState(playTimeAtom)
    // const [timeViewer, setTimeViewer] = useState('00 : 00')
    const isPlay = useRecoilValue(isPlayAtom)
    // const [timer, setTimer] = useRecoilState(timerAtom)
    const wrongStyle = {
        color : wrongCount === 1 ? 'orange' : wrongCount === 0 ? 'green' : 'red',
        fontWeight : wrongCount !==0 && 'bold'
    }

    
    useEffect(() => {
        let timer
        if(isPlay){
            timer = setInterval(() => {
                setPlayTime(prev => prev+1)
            }, 1000)
        }else{
            clearInterval(timer)
        }

        return () => clearInterval(timer)
    },[playTime, isPlay])

    function timeViewer(time) {
        let min = Math.floor(time / 60)
        let sec = time % 60
        if(sec<10) sec = '0' + sec
        if(min<10) min = '0' + min
        return `${min}:${sec}`
    }

    return(
        <header>
            <p>기회 <span style={wrongStyle}>{wrongCount}/3</span></p>
            <p>시간 <span>{timeViewer(playTime)}</span></p>
        </header>
    )
}
export default Header