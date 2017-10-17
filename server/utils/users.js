
class Users {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var userToDelete = this.users.filter((user) => {
            return user.id === id;
        });
        if(userToDelete) {
            this.users = this.users.filter((user) => user.id != id);
        }
        return userToDelete;
        
    }
    getUser(id) {
        
        var filteredUsers = this.users.filter((user) => {
            return user.id === id;
        });
        return filteredUsers[0];
    }
    getUserList (room) {
        var filteredUsers = this.users.filter((user) => {
            return user.room === room;
        })
        var namesArray = filteredUsers.map((user) => {
            return user.name;
        });
        return namesArray;
    }
}
module.exports = {
    Users
}