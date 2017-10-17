const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

        beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Anton',
            room: 'Room 1'
        },
        {
            id: 2,
            name: 'Mark',
            room: 'Room 2'
        },
        {
            id: 3,
            name: 'John',
            room: 'Room 2'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Anton',
            room: 'Room 1'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for Room 2', () => {
        var userList = users.getUserList('Room 2');

        expect(userList).toEqual(['Mark', 'John']);
    });
    it('should return names for Room 1', () => {
        var userList = users.getUserList('Room 1');

        expect(userList).toEqual(['Anton']);
    });

    it('should remove a user', () => {
        var deletedUser = users.removeUser(1);
        expect(users.users).not.toContainEqual(deletedUser);
    });

    it('should not remove user', () => {
        var lenBefore = users.users.length;
        var deletedUser = users.removeUser(5);
        var lenAfter = users.users.length;
        expect(lenBefore).toBe(lenAfter);
        expect(users.users).toEqual(users.users);
    });

    it('should find user', () => {
        var userId = 1;
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = 5;
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });
})