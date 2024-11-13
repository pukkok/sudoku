/**
 * 
 * @param {Array} board 
 * @returns HTMLTableElement
 * @description 
 * 생성된 2차원배열 9 * 9 스도쿠 데이터를 
 * table을 생성하여 넣는다.
 */
function buildMatrix (board = []) {
  const table = document.createElement('table')
  const tableBody = document.createElement('tbody')

  const classMaker = (row, col) => {
    let name = 'cell '
    
    if(row < 3 && col < 3) name += 'box1'
    if(row < 3 && 3 <= col && col < 6) name += 'box2'
    if(row<3 && 6 <= col && col<9) name += 'box3'
    if(3 <= row && row<6 && col<3) name += 'box4'
    if(3 <= row && row<6 && 3<=col && col<6) name += 'box5'
    if(3 <= row && row<6 && 6 <= col && col<9) name += 'box6'
    if(6 <= row && row<9 && col<3) name += 'box7'
    if(6 <= row && row<9 && 3<=col && col<6) name += 'box8'
    if(6 <= row && row<9 && 6 <= col && col<9) name += 'box9'

    return name.trim()
  }

  board.forEach((xline, row) => {
    const tr = document.createElement('tr')
    let child = ''
    xline.forEach((cell, col) => {
      const name = classMaker(row, col)
      child += `<td 
      class = "${name}"
      data-coords = "${row}-${col}"
      >${cell}</td>`
    })
    tr.innerHTML = child

    tableBody.append(tr)
  })

  table.append(tableBody)

  return table

}

export default buildMatrix