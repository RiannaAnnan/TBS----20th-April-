import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import {UserContextProvider} from './UserContext';
import UserAccountPage from './pages/AccountPage';
import HotelPage from './pages/HotelPage';
import FlightPage from './pages/FlightPage';
import PackagePage from './pages/PackagePage';
import DiscoverPage from './pages/DiscoverPage';
import PrivacyPage from './pages/PrivacyPage';
import ExistingHotels from './pages/ExistingHotels';
import Hotel from './pages/Hotel';
import Booking from './pages/BookingInfoPage';
import HotelFormPage from './pages/HotelFormPage';


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;


function App() {
  return (
  <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element = {<IndexPage />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/register" element = {<RegisterPage/>} />
        <Route path="/account" element = {<UserAccountPage/>} />
        <Route path="/account/:subpage?" element = {<UserAccountPage/>} />
        <Route path="/account/:subpage/:action" element = {<UserAccountPage/>} />
        <Route path="/hotels" element = {<HotelPage />} />
        <Route path="/flights" element = {<FlightPage />} />
        <Route path="/packages" element = {<PackagePage />} />
        <Route path="/discover" element = {<DiscoverPage /> } />
        <Route path="/privacy" element = {<PrivacyPage />} />
        <Route path="/edithotels" element = {<ExistingHotels />} />
        <Route path="/hotel/:id" element = {<Hotel />} />
        <Route path="/account/bookings/:id" element = {<Booking />} />
        <Route path="/account/hotels/:id" element = {< HotelFormPage/>} />
        </Route>
        </Routes>
        </UserContextProvider>
          
  )
}

export default App
