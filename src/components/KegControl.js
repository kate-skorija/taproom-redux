import React from 'react';
import NewKegForm from './NewKegForm';
import KegList from './KegList';
import KegDetail from './KegDetail';
import EditKegForm from './EditKegForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';

class KegControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  handleClick = () => {
    const { dispatch } = this.props;
    if (this.props.selectedKeg != null && this.props.editing != false) {
      const action = a.deselectKeg();
      dispatch(action);
      const action2 = a.toggleEditForm();
      dispatch (action2);
    } else if (this.props.selectedKeg != null) {
      const action3 = a.deselectKeg();
      dispatch(action3);
    } else {
      const action3 = a.toggleForm();
      dispatch(action3);
    };
  };

  handleAddingNewKegToList = (newKeg) => {
    const { dispatch } = this.props;
    const action = a.addKeg(newKeg);
    dispatch(action);
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedKeg = (id) => {
    const { dispatch } = this.props;
    const selectedKegInKegList = this.props.masterKegList[id];
    const action = a.selectKeg(selectedKegInKegList);
    dispatch(action);
  };

  handlePintSold = (kegId) => {
    const { dispatch } = this.props;
    const kegToUpdate = this.props.masterKegList[kegId];
    if (kegToUpdate.pintsRemaining > 0) {
      kegToUpdate.pintsRemaining--;
    }
    const action = a.addKeg(kegToUpdate);
    dispatch(action);
  };

  handleDeletingKeg = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteKeg(id);
    const action2 = a.deselectKeg();
    dispatch(action);
    dispatch(action2);
  };

  handleEditClick = () => {
    const { dispatch } = this.props;
    const action = a.toggleEditForm();
    dispatch(action);
  };

  handleEditingKeg = (kegToEdit) => {
    const { dispatch } = this.props;
    const action = a.addKeg(kegToEdit);
    const action2 = a.toggleEditForm();
    const action3 = a.deselectKeg();
    dispatch(action);
    dispatch(action2);
    dispatch(action3);
  };

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.props.editing) {
      currentlyVisibleState = <EditKegForm 
                                keg = {this.props.selectedKeg} 
                                onEditKeg = {this.handleEditingKeg} />
      buttonText = "Return to Keg List"
    } else if (this.props.selectedKeg != null) {
      currentlyVisibleState = <KegDetail 
                                keg = {this.props.selectedKeg} 
                                onClickingDelete = {this.handleDeletingKeg} 
                                onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Keg List"
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewKegForm 
                                onNewKegCreation = {this.handleAddingNewKegToList} />
      buttonText = "Return to Keg List"
    } else {
      currentlyVisibleState = <KegList 
                                kegList = {this.props.masterKegList} 
                                onKegSelection = {this.handleChangingSelectedKeg} 
                                onPintSoldClick = {this.handlePintSold} />
      buttonText = "Add Keg"
    }

    const bodyStyles = {
      width: '100vw',
      height: '82vh',
      backgroundColor: 'darkolivegreen',
      fontFamily: 'Lato',
      marginTop: '-20px',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '6em'
    }

    const buttonStyles = {
      width: '100vw',
      height: '20vh',
      backgroundColor: '#292b2c',
      border: 'none',
      color: 'antiquewhite',
      fontSize: '40px',
      fontFamily: 'Oleo Script Swash Caps',
      outline: 'none'
    }

    const footerStyles = {
      position: 'absolute',
      bottom: '0',
      width: '100vw',
      height: '20vh'
    }

    return (
      <React.Fragment>
        <div style={bodyStyles}>
          {currentlyVisibleState}
          <div style={footerStyles}>
            <button style={buttonStyles} onClick={this.handleClick}>{buttonText}</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

KegControl.propTypes = {
  masterKegList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool,
  selectedPost: PropTypes.object,
  editing: PropTypes.bool,
}

const mapStateToProps = state => {
  return {
    masterKegList: state.masterKegList,
    formVisibleOnPage: state.formVisibleOnPage,
    selectedKeg: state.selectedKeg,
    editing: state.editing
  }
}

KegControl = connect(mapStateToProps)(KegControl);

export default KegControl;