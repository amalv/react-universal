import jsonServer from "json-server";
import passport from "passport";
import passportLocal from "passport-local";
import db from "./db";
import { findByUsername, findById } from "./users";

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    process.nextTick(() => {
      findByUsername(username, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: `Unknown user ${username}` });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Invalid password" });
        }
        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    return cb(null, user);
  });
});

const server = jsonServer.create();

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(passport.initialize());
server.use(jsonServer.bodyParser);

server.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(201);
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
