import { Router } from 'express';
import { SessionController } from '../controllers/Session.controller';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const routesSession = Router();
const session = new SessionController();

routesSession.post('/', session.create);
routesSession.get('/:token', session.find);

export { routesSession };