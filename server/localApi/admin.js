import express from 'express';
import models from '../dbmodels';
import rp from 'request-promise';
import Location from '../dblib/Location';
import Photo from '../dblib/Photo';

const router = express.Router();

// TODO: Christ, this is insecure.  And on a GET, as well?  Remove it when I have an actual deployment process!
router.get('/initdb', async function (req, res) {
  await models.sequelize.sync({ force: true });
  res.json({ done: "Done" });
});

router.get('/version', function (req, res) {
  res.json({ ver: "1.0" });
})

router.get('/locations', async function(req, res) {
  var locations = await Location.getAllLocations();
  res.json(locations);
});

router.get('/photos/:locationId', async function(req, res) {
  var photos = await Photo.getPhotosForLocation(req.params.locationId);
  res.json(photos);
  
  /*[
    {id:1, thumbUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_thumb.jpg', zoomUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_large.jpg', caption:'One'},
    {id:2, thumbUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_thumb.jpg', zoomUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_large.jpg', caption:'Two'},
    {id:3, thumbUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_thumb.jpg', zoomUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_large.jpg', caption:'Three'},
    {id:4, thumbUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_thumb.jpg', zoomUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_large.jpg', caption:'Four'},
    {id:5, thumbUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_thumb.jpg', zoomUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_large.jpg', caption:'Five'},
    {id:6, thumbUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_thumb.jpg', zoomUrl:'http://www.lifeontrains.com/usaroth/UploadedImages/8D989F_large.jpg', caption:'Six'}
  ]);*/
});

export default router;
