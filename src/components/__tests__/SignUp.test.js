import React from "react";
import { render, waitForElement } from "react-testing-library";
import { StyledSignUp } from "../SignUp/SignUp";

describe("Test SignUp", () => {
  test("it renders sign up text", async () => {
    const { getByText } = render(<StyledSignUp />);
    await waitForElement(() => getByText(/Sign up/i));
  });
});
