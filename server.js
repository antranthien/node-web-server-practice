const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use((request, response, next) => { //Use next to tell Express when we're done
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((request, response, next) => {
  response.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (request, response) => {
  // response.send('<h1>Hello Expess !!!</h1>');
  // response.send({
  //   name: 'An Tran',
  //   likes: ['reading', 'travelling']
  // });

  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    message: 'The URL is not valid'
  });

});
app.listen(3000, () => {
  console.log('Binding to port 3000');
}); //bind the application to a port in the machine
