import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarsPage from './pages/CarsPage';
import Tariffs from './pages/Tariffs';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <PageWithTransition>
                  <Home />
                </PageWithTransition>
              } />
              <Route path="/cars" element={
                <PageWithTransition>
                  <CarsPage />
                </PageWithTransition>
              } />
              <Route path="/tariffs" element={
                <PageWithTransition>
                  <Tariffs />
                </PageWithTransition>
              } />
              <Route path="/about" element={
                <PageWithTransition>
                  <About />
                </PageWithTransition>
              } />
              <Route path="/login" element={
                <PageWithTransition>
                  <Login />
                </PageWithTransition>
              } />
              <Route path="/register" element={
                <PageWithTransition>
                  <Register />
                </PageWithTransition>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <PageWithTransition>
                    <Profile />
                  </PageWithTransition>
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PageWithTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}

export default App;
