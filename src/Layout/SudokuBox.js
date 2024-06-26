import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'
import { correctBoardAtom, levelAtom, wrongCountAtom } from '../Recoil/SudokuAtom'

function SudokuBox () {
    const correctBoard = useRecoilValue(correctBoardAtom)
    const [blankBoard, setBlankBoard] = useState([])

    const level = useRecoilValue(levelAtom)

    const makeBlankBoard = (board, difficulty) => {
        const blankBoard = JSON.parse(JSON.stringify(board))
        function randomNumber(){
            return Math.floor(Math.random()*9)
        }

        let checkArr = []
        while(checkArr.length < difficulty){
            let x = randomNumber()
            let y = randomNumber()
            if(!checkArr.includes(`${x},${y}`)){
                checkArr.push(`${x},${y}`)
                blankBoard[x][y] = ''
            }
        }
        return blankBoard
    }

    useEffect(()=>{
       setBlankBoard(makeBlankBoard(correctBoard, level)) 
    },[correctBoard, level])

    const [wrongCount, setWrongCount] = useRecoilState(wrongCountAtom)
    const [answers, setAnwsers] = useState({})

    // 정답 입력할때
    const answerCheck = (e, xy) => {
        // 1글자만 입력되도록 변경
        if(e.target.value.length>1){
            e.target.value = e.target.value.charAt(1)
        }
        setAnwsers({...answers, [xy] : e.target.value})

        const coords = xy.split('-')
        const correct = correctBoard[coords[0]][coords[1]]
        
        if(+e.target.value === correct){
            e.target.style.color = 'blue'
        }else{
            e.target.style.color = 'red'
            setWrongCount(wrongCount+1)
        }
    }

    // 3번 틀리면 아웃!
    useEffect(()=>{
        if(wrongCount === 3){
            alert('GAME OVER!')
        }
    },[wrongCount])

    useEffect(()=>{
        const keys = Object.keys(answers)
        if(keys.length === level){
            const final = keys.filter(key => {
                const coords = key.split('-')
                const correct = correctBoard[coords[0]][coords[1]]
                return +answers[key] === correct
            })
            if(final.length === level){
                alert('승리')
            }
        }
    },[answers, correctBoard, level])

    const inputRefs = useRef([])
    const focusInput = (e) => {
        inputRefs.current.forEach(input => {
            if( // 같은 라인, 같은 박스
                input.name.split('-')[0] === e.target.name.split('-')[0] || 
                input.name.split('-')[1] === e.target.name.split('-')[1] ||
                input.className === e.target.className
            ){
                input.style.backgroundImage = 'linear-gradient(rgba(249, 95, 213, 0.2), rgba(249, 95, 213, 0.2))'
            }else{
                input.style.backgroundImage = ''
            }
    
            if(input.value === e.target.value){
                if(input.value){
                    input.style.backgroundImage = 'linear-gradient(rgba(249, 95, 213, 0.6), rgba(249, 95, 213, 0.6))'
                }else{
                    e.target.style.backgroundImage = 'linear-gradient(rgba(249, 95, 213, 0.6), rgba(249, 95, 213, 0.6))'
                }
            }
        })
    }

    return(
        <div id='sudoku-box'>
            {blankBoard.map((xline, idx1)=>{
                return <React.Fragment key={idx1}>
                    {xline.map((cell, idx2) => {
                        return (
                            <div onClick={focusInput}
                            className={classnames('cell', 
                            {top : idx1 % 3 === 0}, {bottom : idx1 === 8}, {left : idx2 % 3 === 0}, {right : idx2 === 8}
                            )} key={idx2}>
                                <input className={classnames( 
                                {box1: idx1<3 && idx2<3}, {box2: idx1<3 && 3<=idx2 && idx2<6}, {box3: idx1<3 && 6 <= idx2 && idx2<9},
                                {box4: 3 <= idx1 && idx1<6 && idx2<3}, {box5: 3 <= idx1 && idx1<6 && 3<=idx2 && idx2<6}, {box6: 3 <= idx1 && idx1<6 && 6 <= idx2 && idx2<9},
                                {box7: 6 <= idx1 && idx1<9 && idx2<3}, {box8: 6 <= idx1 && idx1<9 && 3<=idx2 && idx2<6}, {box9: 6 <= idx1 && idx1<9 && 6 <= idx2 && idx2<9},
                                )}
                                name={`${idx1}-${idx2}`}
                                onChange={(e) => answerCheck(e, `${idx1}-${idx2}`)} value={cell ? cell : answers[`${idx1}-${idx2}`] ? answers[`${idx1}-${idx2}`] : ''} readOnly={cell} ref={el => {
                                    if(el) inputRefs.current = [...inputRefs.current, el]
                                }}/>
                            </div>
                        )
                    })}
                </React.Fragment>
            })}
        </div>
    )
}

export default SudokuBox