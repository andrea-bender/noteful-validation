import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './css/AddFolder.css';

class AddFolder extends Component {

  static contextType = UserContext;

  state = {
    folder: {name: ''},
    validateName: false
  };

  setFolder = (input) => {
    this.setState({folder: {
      name: input}})
  };

  handleCreateFolder = (addFolder) => {
    const input = this.state.folder.name
    const data = JSON.stringify({name: `${input}`})
    fetch(`http://localhost:9090/folders`, {
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
      addFolder(data.name, data.id)
      return data
    })
    .catch(error => {
      console.error(error)
    })
  };

  validateName = () => {
    console.log(this.state.folder.name)
    let name = this.state.folder.name;
    if(name.length === 0) {
      return 'Folder Name Must Be Filled Out'
    }
  }

  render() {
    return(
      <div className="folder-create">
        <form>
          <label htmlFor="folder">Folder Name
            <p className='error'>{this.validateName()}</p>
          </label>
          <input id='folder' type='text' value={this.state.folder.name}
            onChange={e => this.setFolder(e.target.value)} />
          <Link className='folder-button' to='/' type='submit' onClick={e => {
            e.preventDefault()
            if(this.state.folder.name.length > 0){
            this.handleCreateFolder(
              this.context.addFolder
            )
            this.props.history.push('/')}}}>
              Submit
          </Link>
        </form>
      </div>
    )
  }
}

export default AddFolder