const router = require('express').Router();
const postService = require('../services/postService');

router
.route('/api/v1/posts')
    
.get((req, res, next) => {
    res.json(postService.listAll());
})

.post((req, res, next) => {
    postService.save(req.body.post);
    res.sendStatus(201);
});

router.delete('/posts/:id', (req, res, next) => {
    let deleted = postService.remove(req.params.id);
    res.sendStatus(deleted ? 200 : 500 );
});

module.exports = router;