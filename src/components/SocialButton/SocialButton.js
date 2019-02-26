// @flow
import React from "react";
import type { Node } from "react";
import SocialLogin from "react-social-login";
import { ButtonStyled } from "../SignIn/SignIn.styles";

type Props = { children: Node, triggerLogin: () => void };

const SocialButton = ({ children, triggerLogin, ...props }: Props) => (
  <ButtonStyled
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    onClick={triggerLogin}
    {...props}
  >
    {children}
  </ButtonStyled>
);

export default SocialLogin(SocialButton);
