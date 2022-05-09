import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import ensureAuthenticated from '../middleware/ensureAuthenticated';


const routesUser = Router();

const userController = new UserController();

routesUser.get('/', userController.show);
routesUser.get('/find/:id', userController.find);
routesUser.post('/', userController.create);
routesUser.put('/:id', ensureAuthenticated, userController.update);
routesUser.delete('/:id', ensureAuthenticated, userController.delete);

export { routesUser };
