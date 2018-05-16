import React from 'react';
import LocalApi from '../api/localApi';

class AlbumSheet extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.alreadyLoading = false;
    this.state = { photos: null, imagesToLoad: false };
  }

  imageLoaded(photo) {
    photo.loaded = true;
    if (this.state.imagesToLoad && this.state.photos.every(p => p.loaded == true)) {
      this.setState({ photos: this.state.photos, imagesToLoad: false });
    }
  }

  componentDidMount() {
    console.log('did mount');
    console.log(this.props);
    this.loadPhotosForLocation(this.props.location);
  }

  componentWillReceiveProps(newProps) {
    console.log('will receive props');
    console.log(newProps);
    console.log(newProps.Location);
    this.loadPhotosForLocation(newProps.location);
  }

  async loadPhotosForLocation(locationId) {
    console.log('Load photos for id ' + locationId + ' loading: ' + this.alreadyLoading);
    if (!this.alreadyLoading) {
      this.alreadyLoading = true;
      this.setState({ photos: null });
      var photos = await LocalApi.getLocationPhotos(locationId);
      console.log("Images to load: " + photos.length);
      this.setState({
        photos: photos.sort((a, b) => {
          return Date.parse(a.timestamp) - Date.parse(b.timestamp);
        }), imagesToLoad: (photos.length > 0)
      });
      this.alreadyLoading = false;
      console.log('Loaded');
    }
  }

  componentDidUpdate() {
    if (!this.state.imagesToLoad) {

      $(".fancybox").fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        prevEffect: 'elastic',
        newEffect: 'elastic',
        helpers: {
          title: {
            type: 'under',
            buttons: {}
          }
        },
        beforeLoad: function () {
          // Replace the characters which were escaped by fancybox back with the original characters, to allow basic HTML
          // in photo captions (only italics and links currently supported, to prevent XSS attacks)
          this.title = this.title.replace(new RegExp('&lt;a ', 'g'), '<a ')
            .replace(new RegExp('&lt;i&gt;', 'g'), '<i>')
            .replace(new RegExp('&lt;/', 'g'), '</')
            .replace(new RegExp('&gt;', 'g'), '>');
        }
      });
    }
  }

  render() {
    let photoList = [];
    if (this.state.photos) {
      let figureClass = 'evenfigure';

      this.state.photos.forEach((p) => {
        const url = p.thumbUrl;
        const zoomUrl = p.zoomUrl;
        let title = p.caption;
        if (p.description && p.description !== '') {
          title = p.description;
        }

        photoList.push(
          <div className="polaroidWrapper" key={p.id}>
            <figure className={figureClass}>
              <a href={zoomUrl} className='fancybox' rel='photochain' id={p.id} title={title}>
                <img src={url} onLoad={this.imageLoaded.bind(this, p)} onError={this.imageLoaded.bind(this, p)} />
              </a>
              <figcaption>{p.caption}</figcaption>
            </figure>
          </div>
        );
        figureClass = figureClass == 'evenfigure' ? 'oddfigure' : 'evenfigure';
      });
    }

    if (this.state.imagesToLoad) {
      return (
        <div>
          <div className="loader">
          </div>
          <div className="albumSheet" style={{ display: "none" }}>
            {photoList}
          </div>
        </div>
      );
    } else {
      return (
        <div className="albumSheet">
          {photoList}
        </div>
      );
    }
  }
}

export default AlbumSheet;
