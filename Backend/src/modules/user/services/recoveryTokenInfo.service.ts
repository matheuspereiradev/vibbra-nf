import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../interfaces/IUserRepository';
import { User } from '../models/entities/User';

interface TokenPayload {
	email: string,
	name: string,
	iat: number,
	exp: number,
	sub: string
}

@injectable()
class RecoveryTokenInfoService {

	constructor(
		@inject('UserRepository')
		private repository: IUserRepository
	) { }

	async execute(token: string): Promise<User> {

		const decode = verify(token, process.env.JWT_SECRET);
		const { email } = decode as TokenPayload;
		const user = await this.repository.findByEmail(email);
		delete user.password;
		return user;
	}
}

export { RecoveryTokenInfoService };

