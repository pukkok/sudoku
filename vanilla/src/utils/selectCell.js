import switchkey from "../constants/switchkey.js"
import buildFooter from "../Layout/Footer.js"
import { remainChance } from "../Layout/Header.js"

function selectedCell (originBoard, remainBlankCounts, chance) {

  const table = document.querySelector('table')
  
  let currentCell // 현재 선택한 셀

  // 현재 셀에 값을 넣어서 맞았는지 틀렸는지 확인 한다.
  document.addEventListener('keyup', (e) => {
    const key = switchkey(e.code)
    if(!key) return // 숫자키를 입력하지 않았다면 종료

    // 처음부터 등록된 셀을 클릭했거나
    // 정답을 맞춘 셀을 클릭했을 경우는 숫자 변경 막기
    if(currentCell.style.color !== 'blue' &&
      currentCell.style.color !== 'black'
    ) {
      // 현재 선택한셀의 좌표
      const [row, col] = currentCell.dataset.coords.split('-')
      currentCell.innerText = key
      
      // 정답을 맞춘 경우
      if(originBoard[row][col] === key){
        remainBlankCounts[key-1]--
        buildFooter(remainBlankCounts) // 남은 값의 개수 변경
        currentCell.style.color = 'blue' // 색상 초기화
        bgHelper(currentCell) // 맞춘 경우 맞춘 값에 따라 라인 표시
        const finish = remainBlankCounts.every(n => n === 0)
        if(finish) console.log('게임 종료')
          
      // 정답을 틀린 경우
      } else {
        currentCell.style.color = 'red'
        chance++
        if(!remainChance(chance)) console.log('게임 종료')
      }
    }
  })

  table.addEventListener('click', (e) => {
    // 셀을 클릭하지 않았다면 종료
    if(e.target.tagName !== 'TD') return

    currentCell = e.target
    bgHelper(currentCell)
  })
}

export default selectedCell

/**
   * @description
   * 현재의 값에 따라 셀의 배경색을 변경시킨다.
   * 같은 값을 가진 셀들 진하게 표시
   * 현재 의 x, y 라인값 표시
   */
function bgHelper (currentCell) {
  const cells = document.querySelectorAll('td')

  const selectedNumber = currentCell.innerText
  const selectedCoord = currentCell.dataset.coords

  // 맨처음엔 선택하지 않음
  if(!selectedCoord) return
  const [row, col] = selectedCoord.split('-')
  cells.forEach(cell => {
    const [currentRow, currentCol] = cell.dataset.coords.split('-')
    // 기본 배경 색상 초기화
    cell.style.backgroundImage = ''
    
    // 주변의 색 변환
    if(row === currentRow || col === currentCol) {
        cell.style.backgroundImage = `linear-gradient(rgba(255, 182, 193, 0.2), rgba(255, 182, 193, 0.2))`
    }

    // 선택한 셀이 숫자가 있다면 같은 숫자의 값들을 모두 칠한다.
    if(selectedNumber){ 
      if(cell.innerText === selectedNumber){
        cell.style.backgroundImage = `linear-gradient(rgba(255, 182, 193, 0.8), rgba(255, 182, 193, 0.8))`
      }
    } else {
      if(selectedCoord === cell.dataset.coords){
        cell.style.backgroundImage = `linear-gradient(rgba(255, 182, 193, 0.8), rgba(255, 182, 193, 0.8))`
      }
    }
  })
}