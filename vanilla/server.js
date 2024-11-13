const fs = require('fs')
const http = require('http')

const port = 8080

const app = http.createServer((req, res) => {

})

app.listen(port, () => {
  console.log(`${port}번 포트 동작 확인`)
})