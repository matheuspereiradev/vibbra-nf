import { Router } from 'express';
import { ProductTypeController } from '../controllers/ProductType.controller';

const routesProductType = Router();

const productTypeController = new ProductTypeController();

routesProductType.get('/', productTypeController.show);
routesProductType.get('/find/:id', productTypeController.find);

export { routesProductType };

