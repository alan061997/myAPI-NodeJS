const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const db = require('./db');
db.connect();
server.listen(port, function() {
    console.log('Listening on port 3000...')
});
