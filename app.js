var net = require('net');
const http = require('http');
const url = require('url');
const express = require('express');
const app = express();

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

//--------------page paths--------------\\

// Game Pin Screen
app.get('/', function(req, res) {  
  res.render('index', { text: 'The index page!' })
});

// Session Page
app.get('/session/:id/:wordList/:currentTrial/:video', function(req, res) {  
  console.log(req.params.video);
  res.render('session', { video: req.params.video })
});

//--------------video paths--------------\\

// Video Retrieval
app.get('/retrieve/:video', function(req, res) {
  const fs = require('fs');
  const path = 'videos/' + req.params.video + '.mp4';
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});

//port connection
app.listen(3000, () => console.log('Example app listening on port 3000!'))