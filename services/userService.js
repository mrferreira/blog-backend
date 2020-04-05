const db = require('../models');

const NEXTID = {val: 4}

const users = [
    {
        "id": 1,
        "name": "Misael Ferreira",
        "email": "misael.ferreira@gmail.com",
        "role": db.ROLES.manager
    },
    {
        "id": 2,
        "name": "Cris",
        "email": "cris.ferreira@gmail.com",
        "role": db.ROLES.author
    },
    {
        "id": 3,
        "name": "John Doe",
        "email": "johndoe@gmail.com",
        "role": db.ROLES.user
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
        resolve(payload);
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

module.exports = {
    save, 
    remove,
    get,
    listAll
}