import { Router } from 'express';
import haveCompany from '../../user/middleware/haveCompany';
import { CompanyController } from '../controllers/Company.controller';

const routesCompany = Router();

const companyController = new CompanyController();

routesCompany.get('/',haveCompany, companyController.find);
routesCompany.post('/', companyController.create);
routesCompany.put('/',haveCompany, companyController.update);
routesCompany.delete('/',haveCompany,haveCompany, companyController.delete);

export { routesCompany };
