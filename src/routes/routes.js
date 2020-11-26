const Router = require('koa-router');
const handler = require('../controllers/user');
const router = new Router();

router.get('/users', handler.getAll);

router.post('/user', handler.create);

// router.get('/incidents', handler.getAll);

module.exports = router.routes();