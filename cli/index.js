#!/usr/bin/env node
require('nocamel');
const axios = require('axios').default;
const cors = require('cors');
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        origin &&
        /^http:\/\/([a-z0-9-]+\.)*localhost:(3000|8060)$/.test(origin)
      ) {
        // Allow any subdomain under localhost:3000 and localhost:8060
        callback(null, true);
      } else if (!origin) {
        // Allow non-origin requests (like mobile apps or Postman)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);	
const axios_instance = argv => {
    argv.axios = axios.create({
        baseURL: argv['piston-url'],
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return argv;
};

require('yargs')(process.argv.slice(2))
    .option('piston-url', {
        alias: ['u'],
        default: 'http://127.0.0.1:2000',
        desc: 'Piston API URL',
        string: true,
    })
    .middleware(axios_instance)
    .scriptName('piston')
    .commandDir('commands')
    .demandCommand()
    .help()
    .wrap(72).argv;
