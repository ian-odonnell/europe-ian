import urljoin from 'url-join';

/* eslint-disable no-console */
export class ExternalApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(relativeUrl) {
    let fullUrl = relativeUrl;
    if(this.baseUrl && this.baseUrl.length > 0) {
      fullUrl = urljoin(this.baseUrl, relativeUrl);
    }

    // TODO: Better implementation for cache busting - test server-side headers
    return await $.getJSON(fullUrl, {_:new Date().getTime()});
  }

  async post(relativeUrl, body) {
    let fullUrl = relativeUrl;
    if(this.baseUrl && this.baseUrl.length > 0) {
      fullUrl = urljoin(this.baseUrl, relativeUrl);
    }

    return await $.post(fullUrl, body);
  }
}
