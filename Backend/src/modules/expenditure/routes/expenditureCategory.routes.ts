import { Router } from 'express';
import { ExpenditureCategoryController } from '../controllers/ExpenditureCategory.controller';


const routesExpenditureCategory = Router();

const expenditureCategoryController = new ExpenditureCategoryController();

routesExpenditureCategory.get('/', expenditureCategoryController.show);
routesExpenditureCategory.get('/find/:id', expenditureCategoryController.find);
routesExpenditureCategory.post('/', expenditureCategoryController.create);
routesExpenditureCategory.put('/:id', expenditureCategoryController.update);
routesExpenditureCategory.delete('/:id', expenditureCategoryController.delete);

export { routesExpenditureCategory };
