import { Router } from 'express';
import { ReportsController } from '../controllers/Reports.controller';

const routesReports = Router();

const reportsController = new ReportsController();

routesReports.get('/meibillingpercentage', reportsController.meiBillingPercentage);
routesReports.get('/expenditurebycategory', reportsController.expenditureByCategory);
routesReports.get('/montlyexpenditure', reportsController.montlyExpenditures);
routesReports.get('/montlyinvoices', reportsController.montlyInvoices);
routesReports.get('/annualbalance', reportsController.annualBalance);

export { routesReports };
