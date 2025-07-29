import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import RegisterEvent from './pages/RegisterEvent';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
// import DarkModeToggle from './components/DarkModeToggle';
import AdminRegister from './pages/AdminRegister';
import EventDetails from './pages/EventDetails';
import MessageList from './pages/MessageList';
import AllRegistrants from './pages/AllRegistrants';
import EventRegistrants from './pages/EventRegistrants';
import Welcome from './pages/Welcome';
import { Toaster } from 'react-hot-toast';
import AdminFeedback from './pages/AdminFeedback';


function App() {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
                <Route path="/admin/edit-event/:eventId" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
                <Route path="/register/:eventId" element={<RegisterEvent />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/messages" element={<MessageList />} />
                <Route path="/admin/registrants" element={<AllRegistrants />} />
                <Route path="/admin/registrants/event/:eventId" element={<EventRegistrants />} />
                <Route path="/admin/feedback" element={<ProtectedRoute><AdminFeedback /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;