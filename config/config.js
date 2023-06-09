require("dotenv").config()
const NODE_ENV = process.env.NODE_ENV || 'development';

const test= {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_DOMAIN: process.env.MONGODB_DOMAIN || 'localhost:17017',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'nodeTest_test',
    MONGODB_DB_USER: process.env.MONGODB_DB_USER || '',
    MONGODB_DB_PASS: process.env.MONGODB_DB_PASS || ''
  },
  log: {
    enable: !!(process.env.LOGS || true),
    MONGODB_URI: process.env.LOGS_MONGODB_URI || 'mongodb://localhost:17017/',
    MONGODB_DB_MAIN: process.env.LOGS_MONGODB_DB_MAIN || 'nodeTest_test'
  },
  JWT_SECRET : process.env.JWT_SECRET,
  JWT_LIFETIME : process.env.JWT_SECRET
 

};

const development= {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_DOMAIN: process.env.MONGODB_DOMAIN || 'localhost:17017',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'nodeTest',
    MONGODB_DB_USER: process.env.MONGODB_DB_USER || '',
    MONGODB_DB_PASS: process.env.MONGODB_DB_PASS || ''
  },
  log: {
    enable: !!(process.env.LOGS || true),
    MONGODB_URI: process.env.LOGS_MONGODB_URI || 'mongodb://localhost:17017/',
    MONGODB_DB_MAIN: process.env.LOGS_MONGODB_DB_MAIN || 'nodeTest'
  },
  JWT_SECRET : process.env.JWT_SECRET,
  JWT_LIFETIME : process.env.JWT_SECRET
};

const production= {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_DOMAIN: process.env.MONGODB_DOMAIN || 'production_uri',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'blog',
    MONGODB_DB_USER: process.env.MONGODB_DB_USER || 'user',
    MONGODB_DB_PASS: process.env.MONGODB_DB_PASS || '123'
  },
  log: {
    enable: !!(process.env.LOGS || true),
    MONGODB_URI: process.env.LOGS_MONGODB_URI || 'mongodb://production_uri/',
    MONGODB_DB_MAIN: process.env.LOGS_MONGODB_DB_MAIN || 'blog'
  },
  JWT_SECRET : process.env.JWT_SECRET,
  JWT_LIFETIME : process.env.JWT_SECRET
  };

const config = { development, production, test };

module.exports= config[NODE_ENV];
