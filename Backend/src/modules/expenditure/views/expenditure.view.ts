import companyView from "../../company/views/company.view";
import { Expenditure } from "../models/entities/Expenditure";
import expenditureCategoryView from "./expenditureCategory.view";

export default {
	render(expenditure: Expenditure): unknown {
		if (expenditure) {
			const { id, amount, category,provider,idProvider, company, competence, created_at, description, idCategory, idCompany, paymentDate } = expenditure;

			return {
				id,
				amount,
				company: companyView.render(company),
				competence,
				created_at,
				description,
				category: expenditureCategoryView.render(category),
				paymentDate,
				idCategory,
				idCompany,
				provider,
				idProvider
			};
		}
		return {};
	},

	renderMany(expenditures: Expenditure[]): Array<unknown> {
		if (expenditures)
			return expenditures.map(expenditure => this.render(expenditure));
		else
			return [];
	}
};