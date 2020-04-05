
const NEXTID = {
    "val": 3
};

const posts = [
    {
        "id": 1,
        "title": "Sample Post 1",
        "body": "asdfad fakjsfdh kjadsfh akjdsfh akjsdfhak jadkfja hsdfasdjf h."
    },
    {
        "id": 2,
        "title": "Sample Post 2",
        "body": "asdfad fakjsfdh kjadsfh akjdsfh akjsdfhak jadkfja hsdfasdjf h."
    }
];

listAll = () => posts;

save = payload => {
    delete payload.id;
    const post = {
        id: getNextId(),
        ...payload
    }
    posts.push(post);
}

getNextId = () => {
    let id = NEXTID.val+1;
    NEXTID.val = id;
    return id;
}

remove = id => {
    const remove = posts
        .filter(f => +f.id === +id);

    if(remove.length > 0) {
        posts.splice(posts.indexOf(remove[0]), 1);
        return true;
    }

    return false;
}

module.exports = {
    listAll,
    save,
    remove
}