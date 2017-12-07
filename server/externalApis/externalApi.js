import urljoin from 'url-join';
import rp from 'request-promise';

/* eslint-disable no-console */
export class ExternalApi {
  constructor(baseUrl) {
    console.log(process.env.NODE_ENV);
    console.log("Constructing ExternalApi with baseUrl of " + baseUrl);
    this.baseUrl = baseUrl;
  }

  async get(relativeUrl, queryParams) {
    var options = {
      uri: urljoin(this.baseUrl, relativeUrl),
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }
    if (queryParams) {
      options.qs = queryParams;
    }

    console.log("Getting: " + options.uri);

    return await rp(options);
  }

  async post(relativeUrl, body) {
    var options = {
      method: "POST",
      uri: urljoin(this.baseUrl, relativeUrl),
      headers: {
        'User-Agent': 'Request-Promise'
      },
      body,
      json: true
    }

    return await rp(options);
  }

  async put(relativeUrl, body) {
    var options = {
      method: "PUT",
      uri: urljoin(this.baseUrl, relativeUrl),
      headers: {
        'User-Agent': 'Request-Promise'
      },
      body,
      json: true
    }

    return await rp(options);
  }

  async delete(relativeUrl) {
    var options = {
      method: "DELETE",
      uri: urljoin(this.baseUrl, relativeUrl),
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true
    }

    return await rp(options);
  }
}
