import React, { Component } from 'react';

class HandleErrors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>There as been an error, please refresh the page.</h2>
      );
    }
    return this.props.children;
    }
}

export default HandleErrors