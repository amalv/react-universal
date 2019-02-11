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
import {
  Base,
  PaperStyled,
  AvatarStyled,
  Form,
  SubmitButtonStyled,
} from "./SignUp.styles";

type Props = { theme: Theme };

const SignUp = (props: Props) => {
  const { theme } = props;
  const { zIndex, ...rest } = theme;
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
        <Form {...rest}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <Input
              name="confirm-password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
            />
          </FormControl>
          <SubmitButtonStyled
            type="submit"
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
};

export default withTheme()(SignUp);