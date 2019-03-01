// @flow
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import type { Dispatch } from "redux";
import { establishCurrentUser } from "../actions";
import { isServer } from "../reducers/configureStore";

const Grow = styled.div`
  flex-grow: 1;
`;

const links = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/about/",
    text: "About",
  },
  {
    to: "/users/",
    text: "Users",
  },
  {
    to: "/signup/",
    text: "Sign Up",
    grow: true,
    auth: false,
  },
  {
    to: "/signin/",
    text: "Sign In",
    auth: false,
  },
  {
    to: "/logout/",
    text: "Logout",
    grow: true,
    auth: true,
  },
];

type Props = {
  isAuthenticated: boolean,
  establishCurrentUser: Dispatch,
};

class Header extends React.Component<Props> {
  componentWillMount() {
    if (!isServer) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.establishCurrentUser();
    }
  }

  renderLink = link => {
    const button = (
      <Button
        component={props => <Link to={link.to} {...props} />}
        color="inherit"
        data-test={link.text}
      >
        {link.text}
      </Button>
    );
    return link.grow ? (
      <React.Fragment key={link.to}>
        <Grow />
        {button}
      </React.Fragment>
    ) : (
      <React.Fragment key={link.to}>{button}</React.Fragment>
    );
  };

  renderLinks = () => {
    const { isAuthenticated } = this.props;
    return links.map(link => {
      if (Object.prototype.hasOwnProperty.call(link, "auth")) {
        if (link.auth && isAuthenticated) {
          return this.renderLink(link);
        }
        if (!link.auth && !isAuthenticated) {
          return this.renderLink(link);
        }
        return null;
      }
      return this.renderLink(link);
    });
  };

  render() {
    return (
      <AppBar position="static">
        <Toolbar>{this.renderLinks()}</Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

const actions = {
  establishCurrentUser,
};

export default connect(
  mapStateToProps,
  actions
)(Header);
