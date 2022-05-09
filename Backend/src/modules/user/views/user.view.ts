import { User } from "../models/entities/User";


export default {
	render(user: User): unknown {
		if (user) {
			const { id, email, name, surname } = user;

			return {
				id,
				email,
				name,
				surname
			};
		}
		return {};
	},

	renderMany(users: User[]): Array<unknown> {
		if (users)
			return users.map(user => this.render(user));
		else
			return [];
	}
};