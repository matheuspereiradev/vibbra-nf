import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { GetAnnualBalance } from '../services/GetAnnualBalance.service';
import { GetExpenditureByCategory } from '../services/GetExpenditureByCategory.service';
import { GetMeiBillingPercentage } from '../services/GetMeiBillingPercentage.service';
import { GetMontlyExpenditure } from '../services/GetMontlyExpenditure.service';
import { GetMontlyInvoices } from '../services/GetMontlyInvoices.service';

export class ReportsController {

    async meiBillingPercentage(request: Request, response: Response) {
        const { year } = request.query;
        const idCompany = request.company.id;
        const service = container.resolve(GetMeiBillingPercentage);
        const result = await service.execute(idCompany,+year);
        return response.status(200).json(result);
    };

    async expenditureByCategory(request: Request, response: Response) {
        const { year } = request.query;
        const service = container.resolve(GetExpenditureByCategory);
        const result = await service.execute(+year);
        return response.status(200).json(result);
    };
    async annualBalance(request: Request, response: Response) {
        const { year } = request.query;
        const service = container.resolve(GetAnnualBalance);
        const result = await service.execute(+year);
        return response.status(200).json(result);
    };

    async montlyExpenditures(request: Request, response: Response) {
        const { year, grouppedBy } = request.query;
        if (!grouppedBy)
            throw new AppError('grouppedBy is required')
        const service = container.resolve(GetMontlyExpenditure);
        const result = await service.execute(grouppedBy.toString(), +year);
        return response.status(200).json(result);
    };
    async montlyInvoices(request: Request, response: Response) {
        const { year, grouppedBy } = request.query;
        if (!grouppedBy)
            throw new AppError('grouppedBy is required')
        const service = container.resolve(GetMontlyInvoices);
        const result = await service.execute(grouppedBy.toString(), +year);
        return response.status(200).json(result);
    };

};