import axios from "axios";
import { getAllUsers, registerUser } from "../UserService";

describe("UserService", () => {
  test("should fetch all users", () => {
    const users = [
      { username: "Bob", password: "secure" },
      { username: "Lana", password: "secure" },
    ];
    const resp = { data: users };
    axios.get.mockResolvedValue(resp);

    return getAllUsers().then(response => expect(response.data).toEqual(users));
  });

  test("should register user", () => {
    const user = [{ username: "Bob", password: "secure" }];
    const resp = { data: user };
    axios.post.mockResolvedValue(resp);

    return registerUser(user).then(response =>
      expect(response.data).toEqual(user)
    );
  });
});
