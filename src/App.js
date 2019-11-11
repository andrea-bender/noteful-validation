import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Mainpage from './Mainpage';
import Header from './Header';
import FolderView from './FolderView';
import NoteView from './NoteView';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import HandleErrors from './HandleErrors';
import './dummy-store';
import './css/App.css';
import UserContext from './UserContext';

const folderUrl = 'http://localhost:9090/folders';
const notesUrl = 'http://localhost:9090/notes';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(item => item.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  addFolder = (folderName, folderId) => {
    const folderToAdd = [
      {
        name: folderName,
        id: folderId
      }
    ];
    this.setState({
      folders: this.state.folders.concat(folderToAdd)
    });
  };

  addNote = (name, content, modified, folderId, id) => {
    const noteToAdd = [
      {
        name: name,
        content: content,
        id: id,
        modified: modified,
        folderId: folderId
      }
    ];
    this.setState({
      notes: this.state.notes.concat(noteToAdd)
    });
  };

  fetchFolders = () => {
    fetch(folderUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res =>
        this.setState({
          folders: res
        })
      )
      .catch(error => console.log(error.message));
  };

  fetchNotes = () => {
    fetch(notesUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res =>
        this.setState({
          notes: res
        })
      )
      .catch(error => console.log(error.message));
  };

  fetchAll = () => {
    this.fetchFolders();
    this.fetchNotes();
  };

  componentDidMount() {
    this.fetchAll();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          deleteRequest: this.deleteNote,
          addFolder: this.addFolder,
          addNote: this.addNote
        }}
      >
        <HandleErrors>
          <main className="App">
            <Route path="" component={Header} />
            <Switch>
              <Route path="/addNote" component={AddNote} />
              <Route path="/addFolder" component={AddFolder} />
              <Route
                path="/folder/:folderid/note/:noteid/"
                render={props => (
                  <>
                    <NoteView {...props} />
                  </>
                )}
              />
              <Route
                path="/folder/:folderid/"
                render={props => {
                  return <FolderView {...props} />;
                }}
              />
              <Route
                exact
                path="/"
                render={props => {
                  return <Mainpage {...props} />;
                }}
              />
            </Switch>
          </main>
        </HandleErrors>
      </UserContext.Provider>
    );
  }
}

export default App;
