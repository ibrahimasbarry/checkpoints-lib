'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { removeCampusThunk } from '../reducers/campuses';

/* -----------------  Component  ------------------ */

export class CampusItem extends Component {

  constructor(props) {
    super(props);
    // this.handleRemove = this.handleRemove.bind(this);
  }

  // handleRemove (evt) {
  //   evt.stopPropagation();
  //   this.props.removeCampus(this.props.campus.id);
  // }

  // fakeRemove (){
  //   this.props.removeCampus();
  // }

  render () {
    const { campus , removeCampus } = this.props;
    return (
      <div className="col-sm-6 col-lg-4">
        <div className="thumbnail">
          <div className="img-container">
            <img src={campus.image} />
          </div>
          <div className="caption">
            <div className="name-container">
              <strong>{campus.name}</strong>
            </div>
            <p className="campus-buttons">
              <button
                onClick={removeCampus}
                className="btn btn-default caption-button">
                Remove
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

}

/* -----------------  Container  ------------------ */

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  let { history } = ownProps;
  return {
    removeCampus: campusId => {
      dispatch(removeCampusThunk(campusId, history));
    }
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(CampusItem);
