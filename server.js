const express = require('express');
const cors = require('cors');
const fs = require('fs');
const stream = require('stream')
const path = require('path');
const app = express();

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(cors());

app.use(express.static('client/build'));

//--------------video paths--------------\\

// Video Retrieval
app.get('/video/:videoDirectory/:videoName', (req, res) => {
  const path_to = `assets/${req.params.videoDirectory}/${req.params.videoName}.mp4`;
  const stat = fs.statSync(path_to);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1;
      const chunksize = (end-start) + 1;
      const file = fs.createReadStream(path_to, {start, end});
      const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
  } else {
      const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(path_to).pipe(res);
  }
});

// Image Retrieval
app.get('/image/:imageName', (req, res) => {
  const path_to = `assets/images/${req.params.imageName}.png`;
  const r = fs.createReadStream(path_to)
  const ps = new stream.PassThrough()
  stream.pipeline(
   r,
   ps,
   (err) => {
    if (err) {
      console.log(err)
      return res.sendStatus(400); 
    }
  })
  ps.pipe(res)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})

//port connection
//prioritize PORT environment variable
app.listen(
  process.env.PORT || 5000,
  () => console.log('Example app listening on port 5000!')
);
