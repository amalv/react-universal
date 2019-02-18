import Api from "./Api";

const getAllUsers = () => {
  return Api.get("/users/");
};

const registerUser = user =>
  Api.post("/users", {
    username: user.username,
    password: user.password,
  });

const loginUser = (username, password) =>
  Api.post("/login", {
    username,
    password,
  });

const logoutUser = () => Api.get("logout");
export { getAllUsers, registerUser, loginUser, logoutUser };
