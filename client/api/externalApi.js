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

    console.log(this.baseUrl + " + " + relativeUrl + " = " + fullUrl);
    return await $.getJSON(fullUrl);
  }

  async post(relativeUrl, body) {
    var fullUrl = urljoin(this.baseUrl, relativeUrl);
    return await $.post(fullUrl, body);
  }
}
