import { AuthContext } from '../contexts/FakeAuthContext.jsx';
import { useContext } from 'react';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');
  return context;
}
