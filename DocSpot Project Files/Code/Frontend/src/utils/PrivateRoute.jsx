import { Navigate } from 'react-router-dom';
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" />;
}
<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />