import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './css/AddNote.css';

class AddNote extends Component {

  static contextType = UserContext;

  state = {
    note: {
      name: '',
      content: '',
      folderId: '',
      modified: ''
    },
    validateFolder: false,
    validateName: false
  };

  setNoteName = (input) => {
    const newNote = this.state.note
    newNote.name = input
    newNote.modified = new Date()
    this.setState({ note: newNote })
  };

  setNoteContent = (input) => {
    const newNote = this.state.note
    newNote.content = input
    this.setState({ note: newNote })
  };

  setNoteFolderId = (input) => {
    const newNote = this.state.note
    newNote.folderId = input
    this.setState({ note: newNote })
  };

  handleCreateNote = (addNote) => {
    const input = this.state.note
    const data = JSON.stringify({
      name: `${input.name}`,
      content: `${input.content}`,
      folderId: `${input.folderId}`,
      modified: `${input.modified}`
  })
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: data
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      console.log(data.name)
      console.log(data.id)
      addNote(data.name, data.content, data.modified, data.folderId, data.id)
      return data
    })
    .catch(error => {
      console.error(error)
    })
    };

    validateName = () => {
      let name = this.state.note.name;
      if(name.length === 0) {
        console.log(name)
        return 'Note Name Must Be Created';
      }
    }
    
    validateFolder = () => {
      let folder = this.state.note.folderId
      if(folder.length === 0) {
        return 'Please choose a folder...'
      }
    }
    
  render() {
    return(
      <div className='add-note-form'>
        <form className='folder-form'>
          <label htmlFor='note'>Note Name
          <p className='error'>{this.validateName()}</p></label>
          <input placeholder='Note Name' id='name' type='text' value={this.state.note.name} required
            onChange={e =>  {
              this.setNoteName(e.target.value)
            }} 
            />
          <textarea placeholder='Note Content' id='content' type='text' value={this.state.note.content} 
            onChange={e => this.setNoteContent(e.target.value)}/>
            <p className='error'>{this.validateFolder()}</p>
          <select id='folderId'
            onChange={e => this.setNoteFolderId(e.target.value)}>
              
              <option value=''>Choose a Folder</option>
            {this.context.folders.map(index => 
              <option key={index.id} value={index.id}>{index.name}</option>  
            )}
          </select>
            <Link className='note-create-button' to='/' type='submit' 
              onClick={e => {
                e.preventDefault()
                if(this.state.note.name.length > 0 && this.state.note.folderId.length > 0){
                this.handleCreateNote(
                  this.context.addNote
                )
                this.props.history.push('/')}  
              }
            }>
                  Submit
            </Link>
        </form>
      </div>
    )
  }
}

export default AddNote