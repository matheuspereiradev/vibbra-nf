import { Router } from 'express';
import { InvoiceController } from '../controllers/Invoice.controller';

const routesInvoice = Router();

const invoiceController = new InvoiceController();

routesInvoice.get('/', invoiceController.show);
routesInvoice.get('/find/:id', invoiceController.find);
routesInvoice.post('/', invoiceController.create);
routesInvoice.put('/:id', invoiceController.update);
routesInvoice.delete('/:id', invoiceController.delete);

export { routesInvoice };
