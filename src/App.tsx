import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./router/AppRoutes";
import Header from "./components/header/Header";
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "./App.css";
import "./assets/css/color.css";
import "./assets/css/typography.css";
import "./assets/css/sidebar.css";
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginModal from "./components/modals/LoginModal";
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProSidebarProvider } from "react-pro-sidebar";


function App() {
    const [showModal, setShowModal] = useState(false);
    const handleToggleModal = () => setShowModal(!showModal);

    return (
        <Provider store={store}>
          <AuthProvider>
          <ProSidebarProvider>
            <Router>
              <Header onToggleModal={handleToggleModal} />
              {showModal && (
                <LoginModal onClose={handleToggleModal} />
              )}
              <AppRoutes />
            </Router>
            </ProSidebarProvider>
          </AuthProvider>
        </Provider>
    );
}

export default App;
