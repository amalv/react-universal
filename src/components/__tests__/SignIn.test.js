import React from "react";
import { render, waitForElement } from "react-testing-library";
import { StyledSignIn } from "../SignIn";

describe("Test SignIn", () => {
  test("it renders sign in text", async () => {
    const { getByText } = render(<StyledSignIn />);
    await waitForElement(() => getByText(/Sign in/i));
  });
});
