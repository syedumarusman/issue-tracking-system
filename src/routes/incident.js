const Router = require('koa-router');
const handler = require('../controllers/incident');
const auth = require('../utils/authMiddleware');

const router = new Router({
    prefix: '/incident'
})

router.get('/', handler.getAll);

router.post('/', handler.create);

router.put('/:incidentId', handler.update);

router.delete('/:incidentId', handler.remove);

module.exports = router.routes();