import React from 'react';
import ReactDOM from 'react-dom';
import ChatFilters from './chatFilters';
import UserPanel from './userPanel';
import { connect } from 'react-redux';
import * as chatActions from '../../actions/chatActions';

class ChatHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { selectedPersona: undefined };
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className="chatHeader">
        <ChatFilters filters={this.props.filters} changeFilter={this.props.changeFilter} />
        <UserPanel selectedPersona={this.props.user.activePersona} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    filters: state.filters,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: (filterName, showMessages) => dispatch(chatActions.changeFilter(filterName, showMessages))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
