const http = require('http');

const app = require('./index');

http.createServer(app).listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
