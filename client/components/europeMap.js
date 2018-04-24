import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AlbumSheet from './albumSheet';
import LocalApi from '../api/localApi';

class EuropeMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
    var locations = await LocalApi.getLocations();

    // Newest trip to the top
    locations.sort((a, b) => { return a.mapPositionY - b.mapPositionY; });
    this.setState({ locations });
  }

  render() {
    const { match: { params } } = this.props;

    let photoSheet = undefined;
    if(params.location) {
      photoSheet = <AlbumSheet location={params.location} />
    }

    let cities = [];

    if(this.state.locations) {
      for(let city of this.state.locations) {
        const dotImage = city.photosExist ? 'RedDot.png' : 'GreyDot.png';
        cities.push(
          <div key={city.id} className='cityLabel' style={{top: city.mapPositionY/10 + '%', left: city.mapPositionX/10 + '%'}}>
            <NavLink to={`/${city.id}`}><img src={`/images/${dotImage}`}/></NavLink>
            <span>{city.name}</span>
          </div>
          )
      }
    }

    return (
      <div className=''>
        <div className='title'>
          <img className='titleimage' src='/images/Title.png'/>
          <img className='orcimage' src='/images/OrcPhotoPlain.jpg'/>
        </div>
        {photoSheet}
        <div className='mapWrapper'>
          <div className='europeMap'>
            {cities}
          </div>
        </div>
        <div className='footer'>
          <div className='leftfooter'>
            <a href='http://www.lifeontrains.com/'>
              <img src='/images/BlizzConPhoto.jpg'/>
            </a>
          </div>
          <div className='rightfooter'>
            <a href='http://www.lifeontrains.com/Album/35'>
              <img src='/images/ThamesPathPhoto.jpg'/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.user,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
//    loadChat: () => dispatch(chatActions.loadChat()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EuropeMap);
