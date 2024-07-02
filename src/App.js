import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/landing_page'
import LogIn from './components/user_handling/login'
import SignUp from './components/user_handling/signup'

import { DocumentProvider } from './contexts/DocumentContext';
import { GenerationProvider } from "./contexts/GenerationContext";
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            {/* <GenerationProvider>
              <Route></Route>
            </GenerationProvider> */}
          </Routes>
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;