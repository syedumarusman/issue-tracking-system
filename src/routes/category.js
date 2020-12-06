const Router = require('koa-router');
const handler = require('../controllers/category');

const router = new Router({
    prefix: '/category'
});

router.get('/', handler.getAll);

router.get('/:categoryId', handler.getOne);

router.post('/', handler.create);

router.put('/:categoryId', handler.update);

router.delete('/:categoryId', handler.remove);

module.exports = router.routes();