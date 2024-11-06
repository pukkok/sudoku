const sudoku = () => {
	const gridSize = 9 // 9 by 9

	// 2차원 배열로 만들기(기본 틀)
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
	// 가능한 숫자들의 배열
	const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9] 

	let board = JSON.parse(JSON.stringify(standardBox))
	
	// 보드의 값을 전부 0으로 초기화
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
					shuffleArray(nums) // 배열을 랜덤하게 섞음
	
					for (let i = 0; i < nums.length; i++) {
						let num = nums[i] // 랜덤한 값을 하나씩 넣어본다.
						if (isValidSudoku(board, row, col, num)) {
							board[row][col] = num;
	
							if (makeSudoku(board)) {
								return true // 재귀적으로 다음 셀을 진행하고, 가능하면 true 반환
							}
	
							board[row][col] = 0 // 돌아가기
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
		for (let i=array.length-1; i>0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]
		}
	}
	
	// num이 있다면 사용 불가
	function isValidSudoku(board, row, col, num){
	  // row, col 확인 
		for(let i=0; i<gridSize; i++){
			if(board[row][i] === num || board[i][col] === num){
				return false
			}
		}
		
		// 3 x 3 배열 확인
		const boxRow = Math.floor(row/3)*3
		const boxCol = Math.floor(col/3)*3
		
		for(let i=boxRow; i<boxRow+3; i++){
			for(let j=boxCol; j<boxCol+3; j++){
				if(board[i][j] === num) return false
			}
		}
		
		return true
	}
	
	makeSudoku(board)

	return board
}

export default sudoku