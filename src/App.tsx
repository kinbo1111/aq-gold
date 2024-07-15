import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import AppRoutes from "./router/AppRoutes";
import Header from "./components/header/Header";
import { I18nextProvider } from 'react-i18next';
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "./App.css";
import "./assets/css/color.css";
import "./assets/css/typography.css";
import "./assets/css/sidebar.css";
import { Provider } from 'react-redux';
import store from './redux/store';
import i18n from './i18n';
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
            <I18nextProvider i18n={i18n}>
            <Router>
              <Header onToggleModal={handleToggleModal} />
              <AppRoutes />
              </Router>
              </I18nextProvider>
            </ProSidebarProvider>
          </AuthProvider>
        </Provider>
    );
}

export default App;
