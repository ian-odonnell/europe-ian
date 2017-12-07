import path from 'path';
import config from '../../config';

export default function getBaseUrl(externalApiName) {
  var env = process.env.NODE_ENV || "development";

  if (process.argv.some(a => a.indexOf("_mocha") > -1)) {
    // json-server API using in-memory database, fired up for each test
    return "http://localhost:3002/" + externalApiName + "/";
  }
  /* eslint-disable no-constant-condition */
  else if (env === "test") {
    // Mock API
    return `http://localhost:3000/mockexternal/${externalApiName}/`;
  } else {
    var externalUrls = {
      "steam": config.steamApiBaseUrl
    };
    return externalUrls[externalApiName];
  }
}
