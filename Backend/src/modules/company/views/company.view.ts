import { Company } from "../models/entities/Company";

export default {
	render(company: Company): unknown {
		if (company) {
			const { cnpj, corporateName, id, name } = company;

			return {
				id,
				cnpj,
				name,
				corporateName
			};
		}
		return {};
	},

	renderMany(companies: Company[]): Array<unknown> {
		if (companies)
			return companies.map(comp => this.render(comp));
		else
			return [];
	}
};