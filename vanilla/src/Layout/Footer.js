
/**
 * 
 * @param {Array} remainBlankCounts 
 */
function buildFooter (remainBlankCounts = []) {
  const numberBox = document.createElement('div')
  numberBox.className = 'number-box'

  const numbers = remainBlankCounts.map((count, idx)=> {
    const cn = count === 0 ? 'finish' : ''
    const div = document.createElement('div')
    div.className = 'remain-number'
    div.innerHTML = `
    <p class = "${cn}">${count}</p>
    <span>${idx+1}</span>
    `
    return div
  })
  numberBox.append(...numbers)

  return numberBox
}

export default buildFooter