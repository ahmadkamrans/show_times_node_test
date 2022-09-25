const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const { writeFile, readFile } = require('fs');
const path = __dirname + '/' + 'movies.json';
const showtimeMoviesRouter = require("./routes/showtimeMovies")

const port = 3000
app.set('secretKey', 'showtimeNodeAPI');
app.set('secretKeyExpiration', 500);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Show Times API');
});

app.get("/api/v1/list_movies", (req, res) => {
    readFile(path, 'utf8', (err, data) => {
        res.end(data);
    });
});

app.get("/api/v1/get_token", (req, res) => {
  const token = jwt.sign({ 'secret': req.app.get('secretKey') }, req.app.get('secretKey'), {
      algorithm: "HS256",
      expiresIn: req.app.get('secretKeyExpiration'),
    })
    res.end(token)
});


app.use("/api/v1/movies", authorize, showtimeMoviesRouter);

function authorize(req, res, next) {
  var auth_token = "";
  if(req.headers['authorization']) {
    auth_token = req.headers['authorization'].split(" ")[1];
  }

  console.log(auth_token);
  console.log(req.app.get('secretKey'));

  jwt.verify(auth_token, req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message});
    }else{
      next();
    }
  });
  
}

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
