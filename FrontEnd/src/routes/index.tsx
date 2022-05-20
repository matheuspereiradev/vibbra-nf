import { Route, Routes as Router } from 'react-router-dom';
import BalanceDashboard from '../pages/balance';
import ExpenditureCategoryList from '../pages/expenditureCategory';
import NewCategoryExpenditure from '../pages/expenditureCategory/newCategoryExpenditure';
import ExpendituresListAll from '../pages/expenditures';
import NewExpenditure from '../pages/expenditures/newExpenditure';
import InvoicesListAll from '../pages/invoices';
import NewInvoice from '../pages/invoices/newInvoice';
import Landing from '../pages/landing';
import Login from '../pages/login';
import ProviderList from '../pages/provider';
import NewProvider from '../pages/provider/newProvider';
import Settings from '../pages/settings';
import UserList from '../pages/users';
import NewUser from '../pages/users/newUser';

function Routes() {
    return (
        <Router>
            <Route path="/" element={<Landing />} />
            <Route path="/usuarios" element={<UserList />} />
            <Route path="/usuarios/cadastrar" element={<NewUser />} />
            <Route path="/usuarios/editar/:id" element={<NewUser />} />
            <Route path="/nf" element={<InvoicesListAll />} />
            <Route path="/nf/cadastrar" element={<NewInvoice />} />
            <Route path="/nf/editar/:id" element={<NewInvoice />} />
            <Route path="/despesas" element={<ExpendituresListAll />} />
            <Route path="/despesas/cadastrar" element={<NewExpenditure />} />
            <Route path="/despesas/editar/:id" element={<NewExpenditure />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/categoriasdedespesa" element={<ExpenditureCategoryList />} />
            <Route path="/categoriasdedespesa/cadastrar" element={<NewCategoryExpenditure />} />
            <Route path="/categoriasdedespesa/editar/:id" element={<NewCategoryExpenditure />} />
            <Route path="/balanco" element={<BalanceDashboard />} />
            <Route path="/fornecedores" element={<ProviderList />} />
            <Route path="/fornecedores/cadastrar" element={<NewProvider />} />
            <Route path="/fornecedores/editar/:id" element={<NewProvider />} />
            <Route path="/entrar" element={<Login />} />
        </Router>

    );
}

export default Routes;