const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'node course'
    },{
      id: '2',
      name: 'Jen',
      room: 'react course'
    },{
      id: '3',
      name: 'Julie',
      room: 'node course'
    },]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Matt',
      room: 'the office fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var usersSize = users.users.length;
    users.removeUser('1');

    expect(users.users.length).toBeLessThan(usersSize);
  });

  it('should not remove user', () => {
    var usersSize = users.users.length;
    users.removeUser('0');

    expect(users.users.length).toEqual(usersSize);
  });

  it('should find user', () => {
   var user = users.getUser('1');
   console.log(user);
   expect(user.name.length).toBeGreaterThan(0);
  });

  it('should not find user', () => {
    var user = users.getUser('0');

    expect(user).toEqual(null);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

  it('should return false', () => {
    var userCheck = users.checkUser('Mike');

    expect(userCheck).toEqual(true);
  });

  it('should return list of rooms already made', () => {
    var rooms = users.getRoomList();

    expect(rooms).toEqual(['node course', 'react course'])
  });

});
