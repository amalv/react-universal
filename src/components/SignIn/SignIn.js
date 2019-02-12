// @flow
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles/createMuiTheme";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  Base,
  PaperStyled,
  AvatarStyled,
  Form,
  SubmitButtonStyled,
  Error,
} from "./SignIn.styles";
import { login } from "../../actions";

type Props = { theme: Theme, dispatch: Dispatch };
type State = {
  user: { username: string, password: string },
  submitted: boolean,
};

class SignIn extends React.Component<Props, State> {
  state = {
    user: {
      username: "",
      password: "",
    },
    submitted: false,
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password) {
      dispatch(login(user.username, user.password));
    }
  };

  render() {
    const { theme } = this.props;
    const { user, submitted } = this.state;
    const { zIndex, ...rest } = theme;
    return (
      <Base {...rest}>
        <CssBaseline />
        <PaperStyled {...rest}>
          <AvatarStyled {...rest}>
            <LockOutlinedIcon />
          </AvatarStyled>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form onSubmit={this.handleSubmit} {...rest}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={this.handleChange}
              />
              {submitted && !user.username && (
                <Error>Username is required</Error>
              )}
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              {submitted && !user.password && (
                <Error>Password is required</Error>
              )}
            </FormControl>
            <SubmitButtonStyled
              onClick={this.handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              {...rest}
            >
              Sign in
            </SubmitButtonStyled>
          </Form>
        </PaperStyled>
      </Base>
    );
  }
}

export default connect(
  null,
  null
)(withTheme()(SignIn));
