import { Router } from 'express';
import { UserController } from '../controllers/User.controller';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import haveCompany from '../middleware/haveCompany';


const routesUser = Router();

const userController = new UserController();

routesUser.get('/', haveCompany, userController.show);
routesUser.get('/find/:id', haveCompany, userController.find);
routesUser.post('/', haveCompany, userController.create);
routesUser.put('/:id', ensureAuthenticated, haveCompany, userController.update);
routesUser.delete('/:id', ensureAuthenticated, haveCompany, userController.delete);

export { routesUser };
