import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Folder.css';

export default class Folder extends Component {
  

  render() {
    let link='/folder/'+this.props.id+'/'
    return (
      <NavLink activeClassName="active" to={link} className="folder">
        <p>{this.props.name}</p>
      </NavLink>
    )
  }
}

Folder.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string
}