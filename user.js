const user = {
  name: "Ali",
  age: 20,
};
const userLogger = () => console.log("Logger user", user.name);


module.exports = { user, userLogger };