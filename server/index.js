const server = require('./server.js');
const { conn } = require('./db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3200, () => {
    console.log('Server listening at 3200');
  });
});
