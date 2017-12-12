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
    const multiplePersonas = (this.props.user && this.props.user.parentUser && this.props.user.parentUser.personas.length > 1);

    return (
      <div className="chatHeader">
        <ChatFilters filters={this.props.filters} changeFilter={this.props.changeFilter} />
        <UserPanel selectedPersona={this.props.user.activePersona} multiplePersonas={multiplePersonas} nextPersona={this.props.nextPersona} previousPersona={this.props.previousPersona} />
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
    changeFilter: (filterName, showMessages) => dispatch(chatActions.changeFilter(filterName, showMessages)),
    nextPersona: () => dispatch(chatActions.nextPersona()),
    previousPersona: () => dispatch(chatActions.previousPersona())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
