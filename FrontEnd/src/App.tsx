import { AuthProvider } from './hooks/AuthContext';
import { BackendProvider } from './hooks/BackendContext';
import Routes from './routes';

function App() {
  return (
    <BackendProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BackendProvider>
  );
}

export default App;
