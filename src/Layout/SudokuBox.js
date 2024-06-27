import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'
import { answersAtom, correctBoardAtom, levelAtom, remainingCountsAtom, selectedCellAtom, wrongCountAtom } from '../Recoil/SudokuAtom'
import switchkey from '../Function/SwitchKeyNumber'

function SudokuBox () {
    const correctBoard = useRecoilValue(correctBoardAtom)
    const level = useRecoilValue(levelAtom)
    const [remainingCounts, setRemainingCounts] = useRecoilState(remainingCountsAtom)
    const [blankBoard, setBlankBoard] = useState([])
    const [answers, setAnwsers] = useRecoilState(answersAtom)
    const [selectedCell, setSelectedCell] = useRecoilState(selectedCellAtom)

    useEffect(()=>{
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
            const flattenBlankBoard = blankBoard.reduce((acc, r) => {
                return acc = [...acc, ...r]
            },[])
    
            const remainingCounts = flattenBlankBoard.reduce((acc, r) => {
                if(!r){
                    return acc
                }else if(acc[r]){
                    return acc = {...acc, [r] : acc[r]-1}
                }
            },{1:9, 2:9, 3:9, 4:9, 5:9, 6:9, 7:9, 8:9, 9:9})
            setRemainingCounts(remainingCounts)
            return blankBoard
        }

       setBlankBoard(makeBlankBoard(correctBoard, level))
    },[correctBoard, level, setRemainingCounts])
    
    const [wrongCount, setWrongCount] = useRecoilState(wrongCountAtom)
    
    // 정답 입력할때
    const answerCheck = (e) => {
        let num = switchkey(e.code)
        if(num){
            setAnwsers({...answers, [selectedCell] : num})
        }
    }

    useEffect(()=>{

        if(selectedCell){
            if(answers[selectedCell]){
                let num = answers[selectedCell]
                const coords = selectedCell.split('-')
                const correct = correctBoard[coords[0]][coords[1]]
        
                if(num === correct){
                    cellRefs.current[selectedCell].style.color = 'blue'
                }else{
                    cellRefs.current[selectedCell].style.color = 'red'
                    setWrongCount(wrongCount+1)
                }
            }
        }

    },[answers, selectedCell])

    // 3번 틀리면 아웃!
    useEffect(()=>{
        if(wrongCount === 3){
            alert('GAME OVER!')
        }
    },[wrongCount])

    // 다맞추면 승리!
    useEffect(()=>{

        const keys = Object.keys(answers)
        
        const results = keys.filter(key => {
            const coords = key.split('-')
            const correct = correctBoard[coords[0]][coords[1]]
            return +answers[key] === correct
        })

        console.log(results)

        // 남은 개수 체크
        results.forEach(result => {
            setRemainingCounts({...remainingCounts, 
                [+answers[result]] : remainingCounts[+answers[result]] - 1})
        })

        if(results.length === level){
            alert('승리')
        }
        
    },[answers, correctBoard, level])

    // 박스 클릭
    const cellRefs = useRef({})
    const cellSelector = (e) => {
        // const colorA = 'rgba(175, 238, 238, 0.8)'
        const colorB = 'rgba(255, 182, 193, 0.8)'
        const colorB_2 = 'rgba(255, 182, 193, 0.2)'
        // const colorC = 'rgba(230, 230, 250, 0.8)'
        // const colorD = 'rgba(152, 251, 152, 0.8)'
        // const colorE = 'rgba(255, 255, 224, 0.8)'
        setSelectedCell(e.target.dataset.coords)
        console.log(cellRefs.current)

        for(let xy in cellRefs.current){
            if( // 같은 라인, 같은 박스
                cellRefs.current[xy].dataset.coords.split('-')[0] === e.target.dataset.coords.split('-')[0] || 
                cellRefs.current[xy].dataset.coords.split('-')[1] === e.target.dataset.coords.split('-')[1] ||
                cellRefs.current[xy].className === e.target.className
            ){
                cellRefs.current[xy].style.backgroundImage = `linear-gradient(${colorB_2}, ${colorB_2})`
            }else{
                cellRefs.current[xy].style.backgroundImage = ''
            }
    
            if(cellRefs.current[xy].innerText === e.target.innerText){
                if(cellRefs.current[xy].innerText){
                    cellRefs.current[xy].style.backgroundImage = `linear-gradient(${colorB}, ${colorB})`
                }else{
                    e.target.style.backgroundImage = `linear-gradient(${colorB}, ${colorB})`
                }
            }
        }
    }

    return(
        <div id='sudoku-box'>
            {blankBoard.map((xline, idx1)=>{
                return <React.Fragment key={idx1}>
                    {xline.map((cell, idx2) => {
                        return (
                            <div onClick={cellSelector}
                            className={classnames('cell', 
                            {top : idx1 % 3 === 0}, {bottom : idx1 === 8}, {left : idx2 % 3 === 0}, {right : idx2 === 8}
                            )} key={idx2}>
                                <span data-coords={`${idx1}-${idx2}`} 
                                className={classnames(
                                    {box1: idx1<3 && idx2<3}, {box2: idx1<3 && 3<=idx2 && idx2<6}, {box3: idx1<3 && 6 <= idx2 && idx2<9},
                                    {box4: 3 <= idx1 && idx1<6 && idx2<3}, {box5: 3 <= idx1 && idx1<6 && 3<=idx2 && idx2<6}, {box6: 3 <= idx1 && idx1<6 && 6 <= idx2 && idx2<9},
                                    {box7: 6 <= idx1 && idx1<9 && idx2<3}, {box8: 6 <= idx1 && idx1<9 && 3<=idx2 && idx2<6}, {box9: 6 <= idx1 && idx1<9 && 6 <= idx2 && idx2<9}
                                )}
                                ref={el => {
                                    if(el) cellRefs.current[`${idx1}-${idx2}`] = el
                                }}
                                tabIndex={0}
                                onKeyDown={answerCheck}
                                >{cell ? cell : answers[`${idx1}-${idx2}`] ? answers[`${idx1}-${idx2}`] : ''}</span>
                            </div>
                        )
                    })}
                </React.Fragment>
            })}
        </div>
    )
}

export default SudokuBox