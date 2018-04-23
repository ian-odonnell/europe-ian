import React from 'react';
import { connect } from 'react-redux';

class EuropeMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className=''>
        <div className='title'>
          <img src='/images/Title.png'/>
        </div>
        <div className='mapWrapper'>
          <div className='europeMap'>
            <div className='cityLabel'>
              <img src='/images/Star.png'/>
              <span>Budapest</span>
            </div>
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
