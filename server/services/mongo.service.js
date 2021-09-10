const { MongoClient } = require('mongodb');

const service = {
  client: null,
  db: null,

  async connect(url, dbName) {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db(dbName);
  },

  async close() {
    return this.client.close();
  },
};

module.exports = service;
