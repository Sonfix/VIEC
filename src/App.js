import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext';

import { DocumentProvider } from './contexts/DocumentContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <Routes>

          </Routes>
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;