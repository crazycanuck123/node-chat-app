// adduser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  };
  removeUser(id) {
    // return user that was removed
    var adjustedUsers = this.users.filter((user) => user.id !== id);
    var removedUser = this.users.filter((user) => user.id === id)[0];
    this.users = adjustedUsers;
    return removedUser;
  }
  getUser (id) {
    var newUser = this.users.filter((user) => user.id === id)[0];
    return newUser;
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};
