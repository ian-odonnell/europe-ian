import { ExternalApi } from './externalApi';
// import getBaseUrl from '../baseUrl';

var url = "https://fullstack-seed.azurewebsites.net/"; //getBaseUrl("chievechat");
var chieveChatApi = new ExternalApi(url);

chieveChatApi.getChat = async() => {
  return await chieveChatApi.get("/api/latest");
}

export default chieveChatApi;
