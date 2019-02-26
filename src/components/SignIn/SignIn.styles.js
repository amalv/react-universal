import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const Base = styled.main`
  width: auto;
  display: block;
  margin-left: ${theme => theme.spacing.unit * 3}px;
  margin-right: ${theme => theme.spacing.unit * 3}px;
  ${theme => theme.breakpoints.up("md")} {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PaperStyled = styled(Paper)`
    margin-top: ${theme => theme.spacing.unit * 8}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${theme => theme.spacing.unit * 2}px ${theme =>
  theme.spacing.unit * 3}px ${theme => theme.spacing.unit * 3}px;
  }}
`;

const AvatarStyled = styled(Avatar)`
  && {
    margin: ${theme => theme.spacing.unit}px;
    background-color: ${theme => theme.palette.secondary.main};
  }
`;

const Form = styled.form`
  width: 100%;
  margin-top: ${theme => theme.spacing.unit}px;
`;

const ButtonStyled = styled(Button)`
  && {
    margin-top: ${theme => theme.spacing.unit * 3}px;
  }
`;

const Error = styled.span`
  color: #a94442;
  font-size: 12px;
  margin-top: 5px;
`;

export { Base, PaperStyled, AvatarStyled, Form, ButtonStyled, Error };
