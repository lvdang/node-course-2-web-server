const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// process.env has all the ENV
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials'); // all handle bars partial files
app.set('view engine', 'hbs');




app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to open file');
    }
  });

  next();
});

// app.use( (req, res, next) => {
//   res.render('maintenance.hbs');
// });

// middleware - to read static directory
app.use(express.static(__dirname + '/public/')); // __dirname__: path to directory - use this directory for our server

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home Page'
  })
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/forms', (req, res) => {
  res.send('Forms');
});

app.get('/bad', (req, res) => {
  res.send({
     errorMessage: 'bad data',
  })
});

app.listen(port, () => {
  console.log(`server up on port ${port}`);
});