const MongoClient = require('mongodb').MongoClient;

const service = {
    client: null,
    db: null,
    // not sure what these k/v pairs do
  
    async connect(url, dbName) {
          service.client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
          return  service.db = service.client.db(dbName);
    },
  
    async close() {
      return service.client.close();
    },
};

module.exports = service;
