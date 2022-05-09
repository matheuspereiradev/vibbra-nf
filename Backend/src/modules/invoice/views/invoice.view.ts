import companyView from "../../company/views/company.view";
import { Invoice } from "../models/entities/Invoice";

export default {
	render(invoice: Invoice): unknown {
		if (invoice) {
			const { id, amount, company, competence, created_at, description, nfNumber, receiptDate, idCompany } = invoice;

			return {
				id,
				amount,
				company: companyView.render(company),
				competence,
				created_at,
				description,
				nfNumber,
				receiptDate,
				idCompany
			};
		}
		return {};
	},

	renderMany(invoices: Invoice[]): Array<unknown> {
		if (invoices)
			return invoices.map(invoice => this.render(invoice));
		else
			return [];
	}
};