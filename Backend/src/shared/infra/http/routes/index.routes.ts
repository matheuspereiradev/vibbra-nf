import { Router, Request, Response } from 'express';
import { routesCompany } from '../../../../modules/company/routes/company.routes';
import { routesExpenditure } from '../../../../modules/expenditure/routes/expenditure.routes';
import { routesInvoice } from '../../../../modules/invoice/routes/invoice.routes';
import { routesReports } from '../../../../modules/reports/routes/reports.routes';
import { routesSettings } from '../../../../modules/settings/routes/settings.routes';
import ensureAuthenticated from '../../../../modules/user/middleware/ensureAuthenticated';
import haveCompany from '../../../../modules/user/middleware/haveCompany';
import { routesSession } from '../../../../modules/user/routes/session.routes';
import { routesUser } from '../../../../modules/user/routes/user.routes';

const routes = Router();

routes.get('/', (req: Request, res: Response) => { res.json({ "status": "running" }) });
routes.use('/users', ensureAuthenticated, routesUser);
routes.use('/auth', routesSession);
routes.use('/companies', ensureAuthenticated, routesCompany);
routes.use('/invoices', ensureAuthenticated, routesInvoice);
routes.use('/expenditures', ensureAuthenticated, routesExpenditure);
routes.use('/settings', ensureAuthenticated, haveCompany ,routesSettings);
routes.use('/reports', ensureAuthenticated, routesReports);

export { routes };