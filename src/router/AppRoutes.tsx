import React, { Suspense,useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { useLocation } from 'react-router-dom';



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

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [token, setToken] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [location]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/create-channel" element={<CreateChannel />} />
            <Route path="dashboard/aq-channel" element={<ChannelHome />} />
            <Route path="dashboard/my-list" element={<MyList />} />
            <Route path="dashboard/aq-studio" element={<AQStudioHome />} />
            <Route path="dashboard/settings" element={<Settings />} />
            <Route path="dashboard/search" element={<Search />} />
            <Route path="dashboard/video-upload" element={<VideoUpload />} />
            <Route path="dashboard/favourite" element={<Favourite />} />
            <Route path="dashboard/category">
              <Route path="natural" element={<Natural />} /> 
              <Route path="relaxation" element={<Relaxation />} /> 
              <Route path="music" element={<Music />} /> 
              <Route path="travel" element={<Travel />} /> 
              <Route path="sport" element={<Sport />} /> 
              <Route path="horror" element={<Horror />} /> 
              <Route path="game" element={<Game />} /> 
              <Route path="romance" element={<Romance />} /> 
              <Route path="documentaries" element={<Documentaries />} /> 
              <Route path="animal" element={<Animal />} /> 
              <Route path="entertainment" element={<Entertainment />} /> 
              <Route path="AQvr" element={<AQvr />} /> 
              <Route path="kids" element={<Kids />} /> 
              <Route path="aq18" element={<AQ18 />} /> 
            </Route>

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
        }
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
