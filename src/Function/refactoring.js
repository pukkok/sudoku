function randomNumber(){
    return Math.floor(Math.random()*9)+1
}

function makeSudoku(board){
    for(let row=0; row<gridSize; row++){
        for(let col=0; col<gridSize; col++){
            if(board[row][col] === 0){
                for(let x = 0; x <= gridSize; x++){
                    let num = randomNumber()
                    if(isValidSudoku(board, row, col, num)){ // 유효성 검사
                        board[row][col] = num
                        
                        if(makeSudoku(board)){
                            // 1. 0,0 이 0이 아니면 0,1로 이동
                            // 2. 0,1 이 0이 아니면 0,2로 이동
                            return true
                        }
                        board[row][col] = 0
                    }
                    
                }
                // console.log(row)
                return false // 더이상 돌릴 수 없다.
            }
        }
    }
    return true
}