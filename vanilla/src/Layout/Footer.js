
/**
 * 
 * @param {Array} remainBlankCounts 
 */
function buildFooter (remainBlankCounts = []) {
  const footer = document.querySelector('footer')

  const numberBox = remainBlankCounts.map((count, idx)=> {
    const cn = count === 0 ? 'finish' : ''
    const div = document.createElement('div')
    div.innerHTML = `
    <button class = "${cn}">${idx+1}</button>
    <span>${count}</span>
    `
    return div
  })
  footer.innerHTML = ''
  footer.append(...numberBox)
}

export default buildFooter