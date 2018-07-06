module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '35.230.150.208',
      username: 'roman.odowd',
      // pem: './path/to/pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path

    name: 'stallion-cup',
    path: '../../awesome-world-cup',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://35.230.150.208',
      MONGO_URL: 'mongodb://master-stallion:Ur0Z2Q44xVkH@cluster0-shard-00-00-xht2u.mongodb.net:27017,cluster0-shard-00-01-xht2u.mongodb.net:27017,cluster0-shard-00-02-xht2u.mongodb.net:27017/stallion-cup?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
      MONGO_OPLOG_URL: 'mongodb://oplog-stallion:cjUdqpNEYWkp7Jkt@cluster0-shard-00-00-xht2u.mongodb.net:27017,cluster0-shard-00-01-xht2u.mongodb.net:27017,cluster0-shard-00-02-xht2u.mongodb.net:27017/local?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  }

  
  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'stallioncup.co,www.stallioncup.co',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'roman.odowd@hotmail.de'
  //   }
  // }
};
