// @flow
import React from "react";
import { css } from "@emotion/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withTheme, withStyles } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles/createMuiTheme";
import Snackbar from "@material-ui/core/Snackbar";
import { PacmanLoader } from "react-spinners";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  Base,
  PaperStyled,
  AvatarStyled,
  Form,
  ButtonStyled,
  Error,
} from "./SignIn.styles";
import { login, socialLoginSuccess } from "../../actions";
import SocialButton from "../SocialButton";
import CustomSnackbar from "../Snackbar";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const mapStateToProps = state => ({
  loginFailure: state.authentication.loginFailure,
});

type Props = { theme: Theme, dispatch: Dispatch, loginFailure: boolean };
type State = {
  user: { username: string, password: string },
  submitted: boolean,
  loginSuccess: boolean,
  loading: boolean,
};

class SignIn extends React.Component<Props, State> {
  state = {
    user: {
      username: "",
      password: "",
    },
    submitted: false,
    loginSuccess: false,
    loading: false,
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
    const { loginFailure } = this.props;
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password) {
      dispatch(login(user.username, user.password));
    }
    if (!loginFailure) {
      this.setState({
        loginSuccess: true,
        loading: true,
      });
      setTimeout(() => {
        this.setState({
          loginSuccess: false,
          loading: false,
        });
        dispatch(push("/"));
      }, 5000);
    }
  };

  onLoginSuccess = user => {
    const { dispatch } = this.props;
    // eslint-disable-next-line no-underscore-dangle
    const username = user._profile.firstName;
    dispatch(socialLoginSuccess(username));
    this.setState({
      loading: true,
      loginSuccess: true,
    });
    setTimeout(() => {
      this.setState({
        loginSuccess: false,
        loading: false,
      });
      dispatch(push("/"));
    }, 5000);
  };

  handleClose = () => {
    this.setState({ loading: false });
  };

  render() {
    const { theme } = this.props;
    const { user, submitted, loading } = this.state;
    const { zIndex, ...rest } = theme;
    const { loginSuccess } = this.state;

    const override = css`
      margin-top: 20%;
      margin-right: 55%;
      margin-left: 45%;
    `;

    if (loginSuccess === false) {
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
            <SocialButton
              provider="google"
              appId={process.env.GOOGLE_CLIENT_ID}
              onLoginSuccess={this.onLoginSuccess}
              key="google"
              {...rest}
            >
              Login with Google
            </SocialButton>
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
              <ButtonStyled
                onClick={this.handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                {...rest}
              >
                {" "}
                Sign in
              </ButtonStyled>
            </Form>
          </PaperStyled>
        </Base>
      );
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <PacmanLoader css={override} color="#36D7B7" loading={loginSuccess} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={loading}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <CustomSnackbar
            onClose={this.handleClose}
            variant="success"
            message="Sign in successful!"
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export const StyledSignIn = withTheme()(SignIn);
const connectedSignIn = connect(mapStateToProps)(withTheme()(StyledSignIn));

export default withStyles(styles)(connectedSignIn);
