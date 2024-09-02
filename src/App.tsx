import React, { useState } from "react";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import Header from "./components/header/Header";
import { UserProvider } from './contexts/UserContext';
import { VideoProvider } from './contexts/VideoContext';
import { Provider } from 'react-redux';
import { ProSidebarProvider } from "react-pro-sidebar";
import { I18nextProvider } from 'react-i18next';
import store from './redux/store';
import i18n from './i18n';
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "./App.css";
import "./assets/css/color.css";
import "./assets/css/typography.css";
import "./assets/css/sidebar.css";


function App() {
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => setShowModal(!showModal);

    return (
      <Provider store={store}>
        <UserProvider>
          <VideoProvider>
            <ProSidebarProvider>
              <I18nextProvider i18n={i18n}>
              <Router>
                <Header onToggleModal={handleToggleModal} />
                <AppRoutes />
                </Router>
                </I18nextProvider>
              </ProSidebarProvider>
            </VideoProvider>
          </UserProvider>
        </Provider>
    );
}

export default App;
