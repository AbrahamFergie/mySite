const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '/')))
app.get('/', function(req,res) {
  debugger
  res.sendFile('index.html')
})

app.set('port', (process.env.PORT || 3000))
var server = app.listen(app.get('port'), function() {
  server.address().port
  console.log("=====listening on port 3000!!=====")
})
module.exports = app
