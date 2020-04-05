const db = require('../models');

const NEXTID = {val: 4}

const users = [
    {
        "name": "System Administrator",
        "email": "admin@myblog.com",
        "password": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg2MTA4Mzc5LCJleHAiOjE1ODYxOTQ3Nzl9.ubEJlzjYJdeWQpGwq0yuH6wWz2k9XwUT4Dggphg1w7g",
        "role": "manager"
    }
]

listAll = () => {
    return new Promise(async (resolve, reject) => {
        resolve(users);
    });
}

save = payload => {
    return new Promise(async (resolve, reject) => {
        let user = { id: NEXTID.val++, ...payload };
        users.push(user);
        resolve(user);
    });
}

remove = id => {
    return new Promise(async (resolve, reject) => {
        const toDelete = users.filter(f => +f.id === +id);
        if(toDelete.length > 0) {
            users.splice(users.indexOf(toDelete[0]), 1);
            resolve(true);
        }
        resolve(false);
    });
}

get = id => {
    return new Promise(async (resolve, reject) => {
        const toReturn = users.filter(f => +f.id === +id);
        resolve(toReturn.length > 0 ? toReturn[0] : null);
    });
}

getByEmail = email => {
    return new Promise(async (resolve, reject) => {
        const toReturn = users.filter(f => f.email === email);
        resolve(toReturn.length > 0 ? toReturn[0] : null);
    });
}

setRole = (id, role) => {
    users.filter(f => +f.id === +id)
    .map(user => user.role = role);
}

module.exports = {
    save, 
    remove,
    get,
    getByEmail,
    listAll,
    setRole
}