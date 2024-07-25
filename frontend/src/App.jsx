import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard'
import InvoiceList from './components/invoiceList';
import CreateInvoice from './components/createInvoice'
import UpdateInvoice from './components/updateInvoice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><InvoiceList /></ProtectedRoute>}/>
        <Route path="/create" element={<ProtectedRoute><CreateInvoice /></ProtectedRoute>}/>
        <Route path='/update/:id' element={<ProtectedRoute><UpdateInvoice /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
