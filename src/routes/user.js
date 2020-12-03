const Router = require('koa-router');
const handler = require('../controllers/user');
const auth = require('../utils/authMiddleware');
const { USER_ROLES: { admin, customer, employee } } = require('../utils/constants');

const router = new Router({
    prefix: '/user'
})

router.post('/login', handler.loginUser);

// router.get('/', auth([admin, employee]), handler.getAll);
router.get('/', handler.getAll);

// router.get('/:userId', auth([admin, employee]), handler.getUser);
router.get('/:userId', handler.getUser);

// router.post('/', auth([admin, employee, customer]), handler.create);
router.post('/', handler.create);

// router.put('/:userId', auth([admin, employee, customer]), handler.update);
router.put('/:userId', handler.update);

// router.post('/:userId', auth([admin, employee, customer]), handler.resetPassword);
router.post('/resetPassword', handler.resetPassword);

// router.delete('/:userId', auth([admin, employee]), handler.remove);
router.delete('/:userId', handler.remove);

module.exports = router.routes();