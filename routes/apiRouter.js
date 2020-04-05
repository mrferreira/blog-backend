const router = require('express').Router();
const postService = require('../services/postService');
const { authJWT } = require('../middlewares');

router
.route('/api/v1/posts')
    
.get((req, res, next) => {
    res.json(postService.listAll());
})

.post([authJWT.verifyToken, authJWT.isAuthor],(req, res, next) => {
    console.log('insert post')
    console.log(req.body)
    postService.save(req.body.post);
    console.log('ok')
    res.sendStatus(201);
});

router.delete('/posts/:id', [authJWT.verifyToken, authJWT.isAuthor], (req, res, next) => {
    let deleted = postService.remove(req.params.id);
    res.sendStatus(deleted ? 200 : 500 );
});

module.exports = router;