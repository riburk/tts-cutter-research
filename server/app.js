// var mp3cutter = require('mp3-cutter');
var mediaSplitter = require('media-split');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

const express = require('express');
const app = express();
const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('../assets'));


app.post('/', function(req, res) {
  console.log("doing server stuff");

  var start = req.body.start;
  var end = req.body.end;
  var sectionString = formatSection(start, end);

  let split = new mediaSplitter(
    {
      input: '../assets/speech_math.mp3',
      sections: [sectionString],
      output: '../assets',
      format: 'mp3',
      audioonly: true
    });
  split.parse().then((sections) => {
    for (let section of sections) {
      console.log(section.start);
      console.log(section.end);
    }
  });

  res.end("yes");
});

// this assumes that the start and end times aren't over one minute in length
// only acceptable for proof of concept
function formatSection(start, end) {
  var startMilli = start % 1000;
  var startSeconds = padSeconds((start - startMilli) / 1000);
  var endMilli = end % 1000;
  var endSeconds = padSeconds((end - endMilli) / 1000);
  var sectionValue = `[00:${startSeconds}.${startMilli} - 00:${endSeconds}.${endMilli}] target`;
  console.log(`start: ${start}`);
  console.log(`end: ${end}`)
  console.log(sectionValue);
  return sectionValue;
}

function padSeconds(seconds) {
  if (seconds < 10) {
    return `0${seconds}`;
  } else {
    return seconds;
  }
}

function getSpeechMarks() {

  const file = fs.readFile('../assets/speech_math.marks');
    // '../assets/speech_math.marks';
  const reader = new FileReader();

  reader.onload = (event) =>  {
    const file = event.target.result;
    const allLines = file.split(/\r\n|\n/);
    // Reading line by line
    allLines.forEach((line) => {
      console.log(line);
    });
  };

  reader.onerror = (event) => {
    alert(event.target.error.name);
  };

  reader.readAsText(file);
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
