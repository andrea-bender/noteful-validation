import React from 'react';

const UserContext = React.createContext({
  notes: [],
  foldes: [],
  deleteRequest: () => {},
  addFolder: () => {},
  addNote: () => {}
})

export default UserContext