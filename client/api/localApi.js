import { ExternalApi } from './externalApi';
import config from '../../config';

var localApi = new ExternalApi(config.localApiBaseUrl);

localApi.getLocations = async () => {
  return await localApi.get("/admin/locations");
}

localApi.getLocationPhotos = async (locationId) => {
  return await localApi.get(`/admin/photos/${locationId}`);
} 

export default localApi;
