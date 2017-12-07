import { ExternalApi } from './externalApi';
import config from '../../config';

var chieveChatApi = new ExternalApi(config.localApiBaseUrl);
console.log("Test: " + config.localApiBaseUrl);

chieveChatApi.getChat = async() => {
  return await chieveChatApi.get("/api/latest");
}

export default chieveChatApi;
