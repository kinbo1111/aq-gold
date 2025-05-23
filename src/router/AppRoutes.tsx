import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import VideoContent from "../components/VideoContent";
import { useVideo } from "../contexts/VideoContext";

// Lazy load all pages
const UnauthorizedPage = React.lazy(() => import("../pages/UnAuthorizedPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));
const ProfileEditPage = React.lazy(() => import("../components/ProfileEdit"));
const HomePage = React.lazy(() => import("../pages/Homepage/Homepage"));
const SignIn = React.lazy(() => import("../pages/auth/signin/index"));
const CreateAccount = React.lazy(() => import("../pages/auth/signup/CreateAccount"));
const AuthenticateCode = React.lazy(() => import("../pages/auth/signup/AuthenticateCode"));
const ForgotPassword = React.lazy(() => import("../pages/auth/forgot-password"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const MyList = React.lazy(() => import("../pages/Dashboard/myList"));
const Favorite = React.lazy(() => import("../pages/Dashboard/favorite"));
const AQStudioHome = React.lazy(() => import("../pages/Dashboard/aqStudio"));
const Settings = React.lazy(() => import("../pages/Dashboard/settings"));
const Search = React.lazy(() => import("../pages/Dashboard/search"));
const CreateChannel = React.lazy(() => import("../pages/Dashboard/aqChannel/CreateChannel"));
const ChannelHome = React.lazy(() => import("../pages/Dashboard/aqChannel"));
const VideoUpload = React.lazy(() => import("../pages/Dashboard/videoUpload"));
const AQ18 = React.lazy(() => import("../pages/Dashboard/category/AQ18"));
const Natural = React.lazy(() => import("../pages/Dashboard/category/Natural"));
const AQvar = React.lazy(() => import("../pages/Dashboard/category/AQvr"));
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
const VideoModal = React.lazy(() => import("../components/VideoModal"));
const VideoPlayer = React.lazy(() => import("../components/VRPlayer"));

const AppRoutes: React.FC = () => {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/search/:keyword" element={<PrivateRoute element={<Search />}  />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/favorite" element={<PrivateRoute element={<Favorite />} />} />
        <Route path="/create-channel" element={<PrivateRoute element={<CreateChannel />} />} />
        <Route path="/aq-channel" element={<PrivateRoute element={<ChannelHome />} />} />
        <Route path="/my-list" element={<PrivateRoute element={<MyList />}  />} />
        <Route path="/aq-studio" element={<PrivateRoute element={<AQStudioHome />} />} />
        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
        <Route path="/video-upload" element={<PrivateRoute element={<VideoUpload />} />} />
        <Route path="/video/:videoId"element={<PrivateRoute element={<VideoContent />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfileEditPage />} />} />
        <Route path="/vr-view" element={<PrivateRoute element={<VideoPlayer />} />} />
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
          <Route path="AQvar"  element={<PrivateRoute element={<AQvar />}  />} />
          <Route path="kids"  element={<PrivateRoute element={<Kids />}  />} />
          <Route path="aq18"  element={<PrivateRoute element={<AQ18 />}  />} />
        </Route>
        <Route path="unauthorized" element={<PublicRoute element={<UnauthorizedPage />} />} />
        <Route path="/" element={<PublicRoute element={<HomePage />} />} />
        <Route path="auth">
          <Route path="signin" element={<PublicRoute element={<SignIn />} />} />
          <Route path="signup/create-account" element={<PublicRoute element={<CreateAccount />} />} />
          <Route path="signup/authenticate-code" element={<PublicRoute element={<AuthenticateCode />} />} />
          <Route path="forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
