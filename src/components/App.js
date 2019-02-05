import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Home',
    };
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <nav>
          <ul>
            <li>
              <StyledLink to="/">{ title }</StyledLink>
            </li>
            <li>
              <StyledLink to="/about/">About</StyledLink>
            </li>
            <li>
              <StyledLink to="/users/">Users</StyledLink>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    );
  }
}
