/**
 * 
 * @param {Array} board 
 * @returns 
 */
function buildMatrix (board = []) {
  const table = document.createElement('table')
  const tableBody = document.createElement('tbody')

  let result = ``

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

    // {box1: idx1<3 && idx2<3}, 
    // {box2: idx1<3 && 3<=idx2 && idx2<6}, 
    // {box3: idx1<3 && 6 <= idx2 && idx2<9},
		// {box4: 3 <= idx1 && idx1<6 && idx2<3}, 
    // {box5: 3 <= idx1 && idx1<6 && 3<=idx2 && idx2<6}, 
    // {box6: 3 <= idx1 && idx1<6 && 6 <= idx2 && idx2<9},
		// {box7: 6 <= idx1 && idx1<9 && idx2<3}, 
    // {box8: 6 <= idx1 && idx1<9 && 3<=idx2 && idx2<6}, 
    // {box9: 6 <= idx1 && idx1<9 && 6 <= idx2 && idx2<9}
  }

  board.forEach((xline, row) => {
    const tr = document.createElement('tr')
    let child = ''
    xline.forEach((cell, col) => {
      const name = classMaker(row, col)
      child += `<td class = "${name}">${cell}</td>`
    })
    tr.innerHTML = child

    tableBody.append(tr)
  })

  // tableBody.innerHTML = result

  table.append(tableBody)

  return table

}

export default buildMatrix