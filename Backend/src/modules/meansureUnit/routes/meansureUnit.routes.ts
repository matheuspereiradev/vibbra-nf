import { Router } from 'express';
import { MeansureUnitController } from '../controllers/MeansureUnit.controller';

const routesMeansureUnit = Router();

const meansureUnitController = new MeansureUnitController();

routesMeansureUnit.get('/', meansureUnitController.show);
routesMeansureUnit.get('/find/:id', meansureUnitController.find);

export { routesMeansureUnit };

