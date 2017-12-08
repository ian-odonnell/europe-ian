import { ExternalApi } from './externalApi';
import config from '../../config';

var chieveChatApi = new ExternalApi(config.localApiBaseUrl);
console.log("Test: " + config.localApiBaseUrl);

chieveChatApi.getChat = async () => {
  return await chieveChatApi.get("/api/latest");
}

chieveChatApi.getAuth = async () => {
  return await chieveChatApi.get("/auth");
}

chieveChatApi.postMessage = async (messageBody, parentMessageId) => {
  console.log(messageBody);
  return await chieveChatApi.post("/api/message", { body: messageBody, parentId: parentMessageId });
}

export default chieveChatApi;
