import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Questions from './pages/Questions';
import Resources from './pages/Resources';
import MockInterviews from './pages/MockInterviews';
import InterviewList from './pages/InterviewList';
import InterviewSession from './pages/InterviewSession';
import InterviewReview from './pages/InterviewReview';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import CreateForumPost from './pages/CreateForumPost';
import NotFound from './pages/NotFound';
import InterviewQuestions from './pages/InterviewQuestions';
import ProgressAnalytics from './pages/ProgressAnalytics';
import SpeechAnalysis from './pages/SpeechAnalysis';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/practice" element={<InterviewQuestions />} />
          <Route path="/speech-analysis" element={<SpeechAnalysis />} />
          <Route path="/progress" element={<ProgressAnalytics />} />
          
          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Interview Routes */}
          <Route path="/mock-interviews" element={<MockInterviews />} />
          <Route path="/interviews" element={<PrivateRoute><InterviewList /></PrivateRoute>} />
          <Route path="/interviews/:id" element={<PrivateRoute><InterviewSession /></PrivateRoute>} />
          <Route path="/interviews/:id/review" element={<PrivateRoute><InterviewReview /></PrivateRoute>} />
          
          {/* Question Routes */}
          <Route path="/questions" element={<PrivateRoute><Questions /></PrivateRoute>} />
          
          {/* Forum Routes */}
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumPost />} />
          <Route path="/forum/new" element={<PrivateRoute><CreateForumPost /></PrivateRoute>} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App; 