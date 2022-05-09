import { Router } from 'express';
import { CompanyController } from '../controllers/Company.controller';

const routesCompany = Router();

const companyController = new CompanyController();

routesCompany.get('/', companyController.show);
routesCompany.get('/find/:id', companyController.find);
routesCompany.post('/', companyController.create);
routesCompany.put('/:id', companyController.update);
routesCompany.delete('/:id', companyController.delete);

export { routesCompany };
