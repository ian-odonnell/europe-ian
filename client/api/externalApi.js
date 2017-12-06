import urljoin from 'url-join';

/* eslint-disable no-console */
export class ExternalApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(relativeUrl) {
    var fullUrl = urljoin(this.baseUrl, relativeUrl);
    return await $.getJSON(fullUrl);
  }

  async post(relativeUrl, body) {
    var fullUrl = urljoin(this.baseUrl, relativeUrl);
    return await $.post(fullUrl, body);
  }
}
