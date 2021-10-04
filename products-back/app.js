require('./config/database');

const { server } = require('./config/server');


server.listen(3001).on('error', (err) => {
  console.log('App failed to start');
  console.error(err.message);
  process.exit(0);
}).on ('listening', () => {
  console.log('App started');
});

module.exports = {server};