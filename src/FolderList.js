import React, { Component } from 'react'
import Folder from './Folder'
import './dummy-store'
import UserContext from './UserContext'
import { Link }from 'react-router-dom';
import './css/FolderList.css'

export default class FolderList extends Component {  
  static contextType = UserContext;

  render() {
    let folders = this.context.folders;
    if(this.props.selectedNote){
      folders = folders.filter(folder => folder.id === this.props.selectedId)
    }
    return (
      <div className="folderlist">
        {folders.map(folder =>
          <Folder id={folder.id} key={folder.id} name={folder.name}/>
        )}
        {this.props.selectedNote ? <></> : <Link to='/addFolder' className="add-folder" style={{ textDecoration: 'none' }}>Add Folder</Link>}
      </div>
    )
  }
}
