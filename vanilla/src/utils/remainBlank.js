function extractRemainBlankCount (blankBoard) {

  // 2차원 배열 평탄화 작업
  const flattenBlankBoard = blankBoard.reduce((acc, r) => {
    return acc = [...acc, ...r]
  },[])
  
  // 남은 개수 체크
  const remainBlankCounts = flattenBlankBoard.reduce((acc, current) => {
    if(current !== '') acc[current-1]--
    return acc
  }, Array(9).fill(9))

  return remainBlankCounts
}

export default extractRemainBlankCount