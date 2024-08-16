// Load MUI components
import Layout from "./Components/Layout.jsx";

import { useAuth0 } from "@auth0/auth0-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Profile from "./Auth/Profile.jsx";
import FoodDetails from "./Components/Pages/Food/FoodDetails.jsx";
import FoodInfo from "./Components/Pages/Food/FoodInfo.jsx";
import Home from "./Components/Pages/Home.jsx";
import NotFound from "./Components/Pages/NotFound.jsx";
import UnderConstruction from "./Components/Pages/UnderConstruction.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthenticationGuard from "./Auth/AuthGuard.jsx";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div></div>
  }
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Redirect to="/home" />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<AuthenticationGuard component={Profile} /> } />
          <Route path="/foodinfo" element={<AuthenticationGuard component={FoodInfo} />} />
          <Route path="/foodNutrients/:id" element={<FoodDetails />} />
          <Route path="/about" element={<UnderConstruction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
