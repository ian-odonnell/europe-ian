import express from 'express';
import models from '../dbmodels';
import rp from 'request-promise';
import Location from '../dblib/Location';
import Photo from '../dblib/Photo';
import multer from 'multer';
import UUID from '../helpers/UUID';
import Jimp from 'jimp';

var _path = require("path");
var _path2 = _interopRequireDefault(_path);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

});

var uploading = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/client/static/upload');
//      cb(null, __dirname + '/../../client/static/upload');
    },
    filename: function (req, file, cb) {
      var parts = file.originalname.split('.');
      cb(null, UUID.generate().substring(0, 8) + '-original.' + parts[parts.length - 1]);
    }
  }),
  limits: { fileSize: 2000000 }
});

router.post('/uploadimage',
    uploading.single('image'),
    async function (req, res) {
      if(req.body.uploadpwd != "106Points") throw "Invalid password";
      
      // req.user now contains details about the authenticated user
      // TODO: Introduce a proper config module
      var env = process.env.NODE_ENV || "development";
      //var fullConfig = require(_path2.default.join(__dirname, '../../config', 'config.json'));
      //var config = fullConfig[env];
      const BASE_IMAGE_URL = '/upload/';//config.uploadBaseUrl;

      const originalImage = await Jimp.read(req.file.path);
      const portrait = (originalImage.bitmap.height > originalImage.bitmap.width);

      const thumbImage = originalImage.clone();
      if (portrait) {
        thumbImage.resize(150, Jimp.AUTO);
      } else {
        thumbImage.resize(Jimp.AUTO, 150);
      }
      thumbImage.write(req.file.path.replace('-original', '-thumb'));
      var thumbUrl = BASE_IMAGE_URL + req.file.filename.replace('-original', '-thumb');

      const zoomImage = originalImage.clone();
      if (portrait && zoomImage.bitmap.height > 1200) {
        zoomImage.resize(Jimp.AUTO, 1200);
      } else if (!portrait && zoomImage.bitmap.width > 1200) {
        zoomImage.resize(1200, Jimp.AUTO);
      }
      zoomImage.write(req.file.path.replace('-original', '-zoom'));
      var zoomUrl = BASE_IMAGE_URL + req.file.filename.replace('-original', '-zoom');


      var photoData = { timestamp: Date.now(), thumbUrl, zoomUrl, caption: req.body.caption, description: req.body.description, locationId: req.body.locationId };
      var dbPhoto = await Photo.createPhoto(photoData);

      res.json({
        "Result": `POSTed image to ${zoomUrl}`
      });
    });

export default router;
