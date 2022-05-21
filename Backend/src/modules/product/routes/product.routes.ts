import { Router } from 'express';
import haveCompany from '../../user/middleware/haveCompany';
import { ProductController } from '../controllers/Product.controller';

const routesProduct = Router();

const productController = new ProductController();

routesProduct.get('/', productController.show);
routesProduct.get('/find/:id', productController.find);
routesProduct.post('/', productController.create);
routesProduct.put('/:id', productController.update);
routesProduct.delete('/:id', productController.delete);

export { routesProduct };
