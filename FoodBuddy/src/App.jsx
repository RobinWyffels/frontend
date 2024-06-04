import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home.jsx';
import Profile from './Auth/Profile.jsx';
import FoodInfo from './Components/Pages/Food/FoodInfo.jsx';
import NotFound from './Components/Pages/NotFound.jsx';
import UnderConstruction from './Components/Pages/UnderConstruction.jsx';
import Layout from './Components/Layout.jsx';
import FoodDetails from './Components/Pages/Food/FoodDetails.jsx';
// import PrivateRoute from './Components/PrivateRoute.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
      <Router>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Redirect to="/home" />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/foodinfo" element={<FoodInfo />} />
            <Route path='/foodNutrients/:id' element={<FoodDetails />}/>
            <Route path="/about" element={<UnderConstruction />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    );
  }
  
  export default App;