import React, { Component } from 'react';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Note.css';

function deleteNote(noteId, callback){
  fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
  })
  .then(res => {
    if(!res.ok){
      throw new Error(res.status)
    }
    return res.json()
  })
  .then(data =>{
    callback(noteId)
  })
  .catch(error => {
    console.error(error)
  })
}


export default class Note extends Component {

  static contextType = UserContext;
  
  render() {
      let linkDest = '/folder/' + this.props.folderId + '/note/' + this.props.id
      return (
        <div className="note-body">
          <Link to={linkDest} className="note">
            <h3 className="note-header">
              {this.props.name}
            </h3>
          </Link>
          {this.props.selectedNote ? <p>{this.props.content}</p> : <></>}
            <p>Modified On: {this.props.modified}</p>
          <div className="note-delete">
            <button className="delete-button" onClick={() => {
              deleteNote(
                this.props.id,
                this.context.deleteRequest,
              )
            }}
            >Delete Note</button>
          </div>
        </div>
      )
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  selectedNote: PropTypes.string,
  folderId: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
}