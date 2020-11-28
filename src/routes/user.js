const Router = require('koa-router');
const handler = require('../controllers/user');

const router = new Router({
    prefix: '/user'
})

router.get('/', handler.getAll);

router.get('/:username', handler.getUser);

router.post('/', handler.create);

router.put('/:username', handler.update);

router.delete('/:username', handler.remove);

module.exports = router.routes();