import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InvoiceRepository } from '../models/repositories/Invoice.repository';
import { CreateInvoiceService } from '../services/CreateInvoice.service';
import { DeleteInvoiceService } from '../services/DeleteInvoice.service';
import { UpdateInvoiceService } from '../services/UpdateInvoice.service';
import invoiceView from '../views/invoice.view';

export class InvoiceController {

    async show(request: Request, response: Response) {
        const { competence } = request.query;
        const invoiceRepository = new InvoiceRepository();
        let all;
        if (!competence)
            all = await invoiceRepository.findAll();
        else 
            all = await invoiceRepository.findByCompetence(competence.toString())
        return response.status(200).json(invoiceView.renderMany(all));
    }
    async find(request: Request, response: Response) {
        const { id } = request.params;
        const invoiceRepository = new InvoiceRepository();
        const invoice = await invoiceRepository.findByID(+id);
        return response.status(200).json(invoiceView.render(invoice));
    }

    async create(request: Request, response: Response) {
        const { amount, nfNumber, description, competence, receiptDate, idCompany } = request.body;
        const createService = container.resolve(CreateInvoiceService);
        const invoice = await createService.execute({ amount, competence, description, idCompany, nfNumber, receiptDate })
        return response.status(201).json(invoiceView.render(invoice));
    }

    async update(request: Request, response: Response) {
        const { amount, nfNumber, description, competence, receiptDate, idCompany } = request.body;
        const { id } = request.params;
        const updateService = container.resolve(UpdateInvoiceService);
        const invoice = await updateService.execute({ id: +id, amount, nfNumber, description, competence, receiptDate, idCompany });
        return response.status(200).json(invoiceView.render(invoice));
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const deleteService = container.resolve(DeleteInvoiceService);
        await deleteService.execute(+id);
        return response.status(200).json({ message: "Successfuly excluded" });
    }

};