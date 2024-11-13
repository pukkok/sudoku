const sudoku = () => {
    let gridSize = 9

    // 2중배열로 만들기(기본 틀)
    const standardBox = [
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [1, 1, 1, 2, 2, 2, 3, 3, 3],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [4, 4, 4, 5, 5, 5, 6, 6, 6],
        [7, 7, 7, 8, 8, 8, 9, 9, 9],
        [7, 7, 7, 8, 8, 8, 9, 9, 9],
        [7, 7, 7, 8, 8, 8, 9, 9, 9]
    ]
    
    let board = JSON.parse(JSON.stringify(standardBox))
    
    function boardReset (){
        board.forEach(line => {
            line.fill(0)
        })
    }
    boardReset()
    
    function makeSudoku(board) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (board[row][col] === 0) {
                    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 가능한 숫자들을 배열로 초기화
                    shuffleArray(nums) // 배열을 랜덤하게 섞음
    
                    for (let i = 0; i < nums.length; i++) {
                        let num = nums[i]
                        if (isValidSudoku(board, row, col, num)) {
                            board[row][col] = num
    
                            if (makeSudoku(board)) {
                                return true; // 재귀적으로 다음 셀을 진행하고, 가능하면 true 반환
                            }
    
                            board[row][col] = 0 // Backtrack
                        }
                    }
                    return false // 현재 셀에 대해 가능한 숫자가 없음
                }
            }
        }
        return true // 모든 셀이 채워짐을 반환
    }
    
    // 배열을 랜덤하게 섞는 함수
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function isValidSudoku(board, row, col, num){
      
      // row, col 확인
        for(let i=0; i<gridSize; i++){
            if(board[row][i] === num || board[i][col] === num){
                return false
            }
        }
        
        // 3 x 3 배열 확인
        const startRow = Math.floor(row/3)*3
        const startCol = Math.floor(col/3)*3
        
        for(let i=startRow; i<startRow+3; i++){
            for(let j=startCol; j<startCol+3; j++){
            if(board[i][j] === num){
                return false
            }
            }
        }
        
        return true
    }
    
    makeSudoku(board)

    return board
}

export default sudoku