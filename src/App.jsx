import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;