import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'React Universal',
    };
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h1>{ title }</h1>
      </div>
    );
  }
}
