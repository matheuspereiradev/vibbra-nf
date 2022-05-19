import { Router } from 'express';
import haveCompany from '../../user/middleware/haveCompany';
import { ProviderController } from '../controllers/Provider.controller';

const routesProvider = Router();

const providerController = new ProviderController();

routesProvider.get('/', providerController.show);
routesProvider.get('/find/:id', providerController.find);
routesProvider.post('/', providerController.create);
routesProvider.put('/:id', providerController.update);
routesProvider.delete('/:id', providerController.delete);

export { routesProvider };
