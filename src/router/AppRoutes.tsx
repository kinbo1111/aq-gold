import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";


// Lazy load all pages
const UnauthorizedPage = React.lazy(() => import("../pages/UnAuthorizedPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));
const HomePage = React.lazy(() => import("../pages/Homepage/Homepage"));
const SignIn = React.lazy(() => import("../pages/auth/signin/index"));
const CreateAccount = React.lazy(() => import("../pages/auth/signup/CreateAccount"));
const ConfirmEmail = React.lazy(() => import("../pages/auth/signup/ConfirmEmail"));
const AuthenticateCode = React.lazy(() => import("../pages/auth/signup/AuthenticateCode"));
const ForgotPassword = React.lazy(() => import("../pages/auth/forgot-password"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const MyList = React.lazy(() => import("../pages/Dashboard/myList"));
const AQStudioHome = React.lazy(() => import("../pages/Dashboard/aqStudio"));
const Settings = React.lazy(() => import("../pages/Dashboard/settings"));
const Search = React.lazy(() => import("../pages/Dashboard/search"));
const CreateChannel = React.lazy(() => import("../pages/Dashboard/aqChannel/CreateChannel"));
const ChannelHome = React.lazy(() => import("../pages/Dashboard/aqChannel"));
const VideoUpload = React.lazy(() => import("../pages/Dashboard/videoUpload"));

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/">
            <Route path="/" element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/create-channel" element={<CreateChannel />} />
            <Route path="dashboard/aq-channel" element={<ChannelHome />} />
            <Route path="dashboard/my-list" element={<MyList />} />
            <Route path="dashboard/aq-studio" element={<AQStudioHome />} />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route path="dashboard/search" element={<Search />} />
            <Route path="dashboard/video-upload" element={<VideoUpload />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
            <Route path="auth">
              <Route path="signin" element={<SignIn />} />
              <Route path="signup/create-account" element={<CreateAccount />} />
              <Route path="signup/confirm-email" element={<ConfirmEmail />} />
              <Route path="signup/authenticate-code" element={<AuthenticateCode />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
