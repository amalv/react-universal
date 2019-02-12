import Api from "./Api";

const getAllUsers = () => {
  return Api.get("/users/");
};

const registerUser = user => {
  return Api.post("/users", {
    username: user.username,
    password: user.password,
  });
};

const loginUser = (username, password) => {
  return Api.post("/login", {
    username,
    password,
  });
};

export { getAllUsers, registerUser, loginUser };
