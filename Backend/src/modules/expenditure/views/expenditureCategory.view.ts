import { ExpenditureCategory } from "../models/entities/ExpenditureCategory";

export default {
	render(category: ExpenditureCategory): unknown {
		if (category) {
			const { id, description, name } = category;

			return {
				id,
				description,
				name
			};
		}
		return {};
	},

	renderMany(categories: ExpenditureCategory[]): Array<unknown> {
		if (categories)
			return categories.map(category => this.render(category));
		else
			return [];
	}
};