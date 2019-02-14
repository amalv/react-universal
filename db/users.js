import db from "./db";

const { users } = db;

const findById = (id, fn) => {
  const idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error(`User ${id} does not exist`));
  }
};

const findByUsername = (username, cb) => {
  process.nextTick(() => {
    for (let i = 0, len = users.length; i < len; i += 1) {
      const user = users[i];
      if (user.username === username) {
        return cb(null, user);
      }
    }
    return cb(null, null);
  });
};

export { findByUsername, findById };
