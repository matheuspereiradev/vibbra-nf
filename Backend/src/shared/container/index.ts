import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { container } from 'tsyringe';
import BCryptHashProvider from '../providers/HashProvider/implementation/bcryptHashProvider';
import IUserRepository from '../../modules/user/interfaces/IUserRepository';
import { UserRepository } from '../../modules/user/models/repositories/User.repository';
import ICompanyRepository from '../../modules/company/interfaces/ICompanyRepository';
import { CompanyRepository } from '../../modules/company/models/repositories/Company.repository';
import IInvoiceRepository from '../../modules/invoice/interfaces/IInvoiceRepository';
import { InvoiceRepository } from '../../modules/invoice/models/repositories/Invoice.repository';
import IExpenditureRepository from '../../modules/expenditure/interfaces/IExpenditureRepository';
import { ExpenditureRepository } from '../../modules/expenditure/models/repositories/Expenditure.repository';
import IExpenditureCategoryRepository from '../../modules/expenditure/interfaces/IExpenditureCategoryRepository';
import { ExpenditureCategoryRepository } from '../../modules/expenditure/models/repositories/ExpenditureCategory.repository';
import ISettingsRepository from '../../modules/settings/interfaces/ISettingsRepository';
import { SettingsRepository } from '../../modules/settings/models/repositories/Settings.repository';
import ISendMail from '../providers/mail/model/ISendMail';
import NodeMailerProvider from '../providers/mail/implementations/mailProvider';
import IProviderRepository from '../../modules/provider/interfaces/IProviderRepository';
import { ProviderRepository } from '../../modules/provider/models/repositories/Provider.repository';
import IProductRepository from '../../modules/product/interfaces/IProductRepository';
import { ProductRepository } from '../../modules/product/models/repositories/Product.repository';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<ICompanyRepository>('CompanyRepository', CompanyRepository);
container.registerSingleton<IInvoiceRepository>('InvoiceRepository', InvoiceRepository);
container.registerSingleton<IExpenditureRepository>('ExpenditureRepository', ExpenditureRepository);
container.registerSingleton<IExpenditureCategoryRepository>('ExpenditureCategoryRepository', ExpenditureCategoryRepository);
container.registerSingleton<ISettingsRepository>('SettingsRepository', SettingsRepository);
container.registerSingleton<IProviderRepository>('ProviderRepository', ProviderRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);
container.registerSingleton<ISendMail>('SendMail', NodeMailerProvider);