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

export { getAllUsers, registerUser };
