var express = require('express');
var jsonServer = require('json-server');
var renderToString = require('react-dom/server');
var app = express();
//var Layout = require('./src');
//path
var pathToApp = __dirname;
app.use('/', express.static(__dirname + '/public'));
app.use('/api', jsonServer.router('db.json'));

app.get('authenticate', function(req, res) {
  res.send('hi');
});

app.get('*', function(req, res) {
  res.sendFile(pathToApp + '/public/index.html');
  /*var jsx = ( <Layout /> );
  var reactDom = renderToString( jsx );

  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( htmlTemplate( reactDom ) );*/
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
