import ProtectedPage from './components/ProtectedPage';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import { BackendProvider } from './hooks/BackendContext';
import { DashboardLayout } from './layouts/default';
import ProtectRoute from './routes/protectRoute';
import ProtectedRoute from './routes/protectRoute';
import UnprotectedRoute from './routes/unprotectedRoute';

function App() {
  return (
    <BackendProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BackendProvider>
  );
}

function Routes() {
  const { user } = useAuth();
  if (!user)
    return <UnprotectedRoute />

  return <DashboardLayout>
    <ProtectedRoute />
  </DashboardLayout>

}

export default App;
