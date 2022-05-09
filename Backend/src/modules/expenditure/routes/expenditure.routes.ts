import { Router } from 'express';
import { ExpenditureController } from '../controllers/Expenditure.controller';
import { routesExpenditureCategory } from './expenditureCategory.routes';


const routesExpenditure = Router();

const expenditureController = new ExpenditureController();

routesExpenditure.get('/', expenditureController.show);
routesExpenditure.get('/find/:id', expenditureController.find);
routesExpenditure.post('/', expenditureController.create);
routesExpenditure.put('/:id', expenditureController.update);
routesExpenditure.delete('/:id', expenditureController.delete);
routesExpenditure.use('/categories', routesExpenditureCategory);


export { routesExpenditure };
