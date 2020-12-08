const Koa = require('koa');
const Compose = require('koa-compose')
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Boom = require('boom');
const userRoutes = require('./routes/user');
const incidentRoutes = require('./routes/incident');
const categoryRoutes = require('./routes/category')

const app = new Koa();

app.use(cors());

app.use(async function validationMiddleware(ctx, next) {
    try {
        await next();
    } catch (err) {
        let status;
        let name;
        let message;
        if (Boom.isBoom(err)) {
            status = err.output.statusCode;
            name = err.output.payload.error;
            message = err.output.payload.message; 
        } else if (err.isJoi) {
            ctx.response.status = 400;
            name = err.name;
            message = err.details[0].message;
        }
        ctx.body = {
            "meta": {
                "status code": status,
                "error": name,
                "message": message 
            }
        }
    }
});

app.use(bodyParser());

const routes = Compose([userRoutes, incidentRoutes, categoryRoutes]) 
app.use(routes);

app.listen(4000, () => {
    console.log('Server running at port 4000.');
});