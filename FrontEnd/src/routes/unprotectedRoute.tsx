import { Button } from '@mui/material';
import { Link, Route, Routes as Router } from 'react-router-dom';
import Login from '../pages/login';

function UnprotectedRoutes() {
    return (
        <Router>
            <Route path="/entrar" element={<Login />} />
            <Route path="/" element={
                <Link color="primary" to="/entrar" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button variant="contained">Login</Button>
                </Link>
            } />
        </Router>

    );
}

export default UnprotectedRoutes;