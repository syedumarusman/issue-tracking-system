const Router = require('koa-router');
const handler = require('../controllers/user');
const auth = require('../utils/authMiddleware');

const router = new Router({
    prefix: '/user'
})

router.get('/', handler.getAll);

router.get('/:username', handler.getUser);

router.post('/login', handler.loginUser);

router.post('/', handler.create);

router.put('/:username', handler.update);

router.delete('/:username', handler.remove);

module.exports = router.routes();