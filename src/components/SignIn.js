import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

const Base = styled.main` 
    width: auto;
    display: block;
    margin-left: ${theme => theme.spacing.unit * 3}px;
    margin-right: ${theme => theme.spacing.unit * 3}px;
    ${theme => theme.breakpoints.up('md')} {
      width: 400;
      margin-left: auto;
      margin-right: auto;
    }
;`;

const PaperStyled = styled(Paper)`
    margin-top: ${theme => theme.spacing.unit * 8}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${theme => theme.spacing.unit * 2}px ${theme => theme.spacing.unit * 3}px ${theme => theme.spacing.unit * 3}px;
  }}
`;

const AvatarStyled = styled(Avatar)`
    margin: ${theme => theme.spacing.unit}px;
    background-color: ${theme => theme.palette.secondary.main};
`;

const Form = styled.form`
    width: 100%;
    margin-top: ${theme => theme.spacing.unit}px;
`;

const SubmitButtonStyled = styled(Button)`
    margin-top: ${theme => theme.spacing.unit * 3}px;
`;

const SignIn = (props) => {
  // eslint-disable-next-line react/prop-types
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
          Sign in
        </Typography>
        <Form {...rest}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <SubmitButtonStyled
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
};

export default withTheme()(SignIn);
