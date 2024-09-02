import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ContinueWatching from '../components/ContinueWatching';

// Lazy load all pages
const UnauthorizedPage = React.lazy(() => import("../pages/UnAuthorizedPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));
const ProfileEditPage = React.lazy(() => import("../components/ProfileEdit"));
const HomePage = React.lazy(() => import("../pages/Homepage/Homepage"));
const SignIn = React.lazy(() => import("../pages/auth/signin/index"));
const CreateAccount = React.lazy(() => import("../pages/auth/signup/CreateAccount"));
const ConfirmEmail = React.lazy(() => import("../pages/auth/signup/ConfirmEmail"));
const AuthenticateCode = React.lazy(() => import("../pages/auth/signup/AuthenticateCode"));
const ForgotPassword = React.lazy(() => import("../pages/auth/forgot-password"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const MyList = React.lazy(() => import("../pages/Dashboard/myList"));
const Favourite = React.lazy(() => import("../pages/Dashboard/favourite"));
const AQStudioHome = React.lazy(() => import("../pages/Dashboard/aqStudio"));
const Settings = React.lazy(() => import("../pages/Dashboard/settings"));
const Search = React.lazy(() => import("../pages/Dashboard/search"));
const CreateChannel = React.lazy(() => import("../pages/Dashboard/aqChannel/CreateChannel"));
const ChannelHome = React.lazy(() => import("../pages/Dashboard/aqChannel"));
const VideoUpload = React.lazy(() => import("../pages/Dashboard/videoUpload"));
const AQ18 = React.lazy(() => import("../pages/Dashboard/category/AQ18"));
const Natural = React.lazy(() => import("../pages/Dashboard/category/Natural"));
const AQvr = React.lazy(() => import("../pages/Dashboard/category/AQvr"));
const Documentaries = React.lazy(() => import("../pages/Dashboard/category/Documentaries"));
const Entertainment = React.lazy(() => import("../pages/Dashboard/category/Entertainment"));
const Game = React.lazy(() => import("../pages/Dashboard/category/Game"));
const Horror = React.lazy(() => import("../pages/Dashboard/category/Horror"));
const Music = React.lazy(() => import("../pages/Dashboard/category/Music"));
const Relaxation = React.lazy(() => import("../pages/Dashboard/category/Relaxation"));
const Romance = React.lazy(() => import("../pages/Dashboard/category/Romance"));
const Sport = React.lazy(() => import("../pages/Dashboard/category/Sport"));
const Travel = React.lazy(() => import("../pages/Dashboard/category/Travel"));
const Animal = React.lazy(() => import("../pages/Dashboard/category/Animal"));
const Kids = React.lazy(() => import("../pages/Dashboard/category/Kids"));
const ContinueWatchingPage = React.lazy(() => import("../components/ContinueWatching"));

const AppRoutes: React.FC = () => {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/search" element={<PrivateRoute element={<Search />}  />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/favourite" element={<PrivateRoute element={<Favourite />} />} />
        <Route path="/create-channel" element={<PrivateRoute element={<CreateChannel />} />} />
        <Route path="/aq-channel" element={<PrivateRoute element={<ChannelHome />} />} />
        <Route path="/my-list" element={<PrivateRoute element={<MyList />}  />} />
        <Route path="/aq-studio" element={<PrivateRoute element={<AQStudioHome />} />} />
        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
        <Route path="/video-upload" element={<PrivateRoute element={<VideoUpload />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfileEditPage />} />} />
        <Route path="/continue-watching" element={<PrivateRoute element={<ContinueWatchingPage />} />} />
        <Route path="/category">
          <Route path="natural"  element={<PrivateRoute element={<Natural />} />} />
          <Route path="relaxation"  element={<PrivateRoute element={<Relaxation />}  />} /> 
          <Route path="music"  element={<PrivateRoute element={<Music />}  />} />
          <Route path="travel"  element={<PrivateRoute element={<Travel />} />} />
          <Route path="sport"  element={<PrivateRoute element={<Sport />}  />} />
          <Route path="horror"  element={<PrivateRoute element={<Horror />}  />} />
          <Route path="game"  element={<PrivateRoute element={<Game />}  />} />
          <Route path="romance"  element={<PrivateRoute element={<Romance />}  />} />
          <Route path="documentaries"  element={<PrivateRoute element={<Documentaries />}  />} />
          <Route path="animal"  element={<PrivateRoute element={<Animal />}  />} />
          <Route path="entertainment"  element={<PrivateRoute element={<Entertainment />}  />} />
          <Route path="AQvr"  element={<PrivateRoute element={<AQvr />}  />} />
          <Route path="kids"  element={<PrivateRoute element={<Kids />}  />} />
          <Route path="aq18"  element={<PrivateRoute element={<AQ18 />}  />} />
        </Route>
        <Route path="unauthorized" element={<PublicRoute element={<UnauthorizedPage />} />} />
        <Route path="/" element={<PublicRoute element={<HomePage />} />} />
        <Route path="auth">
          <Route path="signin" element={<PublicRoute element={<SignIn />} />} />
          <Route path="signup/create-account" element={<PublicRoute element={<CreateAccount />} />} />
          <Route path="signup/confirm-email" element={<PublicRoute element={<ConfirmEmail />} />} />
          <Route path="signup/authenticate-code" element={<PublicRoute element={<AuthenticateCode />} />} />
          <Route path="forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
