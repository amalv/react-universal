// @flow
import React from "react";
import { Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import About from "./About";
import Users from "./Users";

type Props = {};

type State = {
  title: string,
};

const Base = styled.div`
  flex-grow: 1;
`;

const Grow = styled.div`
  flex-grow: 1;
`;

class App extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      title: "Home",
    };
  }

  render() {
    const { title } = this.state;
    const IndexLink = props => <Link to="/" {...props} />;
    const AboutLink = props => <Link to="/about/" {...props} />;
    const UsersLink = props => <Link to="/users/" {...props} />;
    const SignUpLink = props => <Link to="/signup/" {...props} />;
    const SignInLink = props => <Link to="/signin/" {...props} />;

    return (
      <Base>
        <AppBar position="static">
          <Toolbar>
            <Button component={IndexLink} color="inherit">
              {title}
            </Button>
            <Button component={AboutLink} color="inherit">
              About
            </Button>
            <Button component={UsersLink} color="inherit">
              Users
            </Button>
            <Grow />
            <Button component={SignUpLink} color="inherit">
              Sign Up
            </Button>
            <Button component={SignInLink} color="inherit">
              Sign In
            </Button>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/signin/" component={SignIn} />
      </Base>
    );
  }
}

export default App;
