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
  SubmitButtonStyled,
  Error,
} from "./SignUp.styles";
import { register, socialLoginSuccess } from "../../actions";
import SocialButton from "../SocialButton";
import CustomSnackbar from "../Snackbar";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const mapStateToProps = state => ({
  registerFailure: state.authentication.registerFailure,
});

type Props = { theme: Theme, dispatch: Dispatch, registerFailure: boolean };
type State = {
  user: { username: string, password: string },
  submitted: boolean,
  registerSuccess: boolean,
  loading: boolean,
};

class SignUp extends React.Component<Props, State> {
  state = {
    user: {
      username: "",
      password: "",
    },
    submitted: false,
    registerSuccess: false,
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
    const { registerFailure } = this.props;
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password) {
      dispatch(register(user));
    }
    if (!registerFailure) {
      this.setState({
        registerSuccess: true,
        loading: true,
      });
      setTimeout(() => {
        this.setState({
          registerSuccess: false,
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
      registerSuccess: true,
    });
    setTimeout(() => {
      this.setState({
        registerSuccess: false,
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
    const { user, submitted, loading, registerSuccess } = this.state;
    const { zIndex, ...rest } = theme;

    const override = css`
      margin-top: 20%;
      margin-right: 55%;
      margin-left: 45%;
    `;

    if (registerSuccess === false) {
      return (
        <Base {...rest}>
          <CssBaseline />
          <PaperStyled {...rest}>
            <AvatarStyled {...rest}>
              <LockOutlinedIcon />
            </AvatarStyled>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <SocialButton
              provider="google"
              appId={process.env.GOOGLE_CLIENT_ID}
              onLoginSuccess={this.onLoginSuccess}
              key="google"
              {...rest}
            >
              Continue with Google
            </SocialButton>
            <SocialButton
              provider="facebook"
              appId={process.env.FACEBOOK_APP_ID}
              onLoginSuccess={this.onLoginSuccess}
              key="facebook"
              {...rest}
            >
              Continue with Facebook
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
                  inputProps={{ "data-test": "sign-up-username" }}
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
                  inputProps={{ "data-test": "sign-up-password" }}
                />
                {submitted && !user.password && (
                  <Error>Password is required</Error>
                )}
              </FormControl>
              <SubmitButtonStyled
                onClick={this.handleSubmit}
                fullWidth
                variant="contained"
                color="primary"
                {...rest}
              >
                Sign up
              </SubmitButtonStyled>
            </Form>
          </PaperStyled>
        </Base>
      );
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <PacmanLoader
          css={override}
          color="#36D7B7"
          loading={registerSuccess}
        />
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
            message="Sign up successful!"
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export const StyledSignUp = withTheme()(SignUp);
const connectedSignUp = connect(mapStateToProps)(withTheme()(StyledSignUp));
export default withStyles(styles)(connectedSignUp);
