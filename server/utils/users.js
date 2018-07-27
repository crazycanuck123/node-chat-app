
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var room = room.toLowerCase();
    var user = {id, name, room};
    this.users.push(user);
    return user;
  };
  removeUser (id) {
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
  checkUser (name) {
    var newUser = this.users.filter((user) => user.name === name)[0];
    return newUser != undefined;
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room.toLowerCase());
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
  getRoomList () {
    var rooms = this.users.filter((user) => user.room);
    var roomsArray = rooms.map((user) => user.room);
    var unique = [];
    var uniqueValue = false;
    roomsArray.forEach((i) => {
      unique.forEach((j) => {
        if (i == j) {
          uniqueValue = true;
        }
      })
      if (uniqueValue == false){
        unique.push(i);
        uniqueValue = false;
      }
      console.log(i);
    });
    return unique;
  }
}

module.exports = {Users};
