import React from "react";
import Navbar from "./_components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./_components/Footer";
import { Route, Routes } from "react-router-dom";
import OurPackages from "./pages/OurPackages";
import MyBookings from "./pages/MyBookings";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/Admin/Dashboard";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/packages" element={<OurPackages />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/dashboard*" element={<DashboardPage />} />

        {/* Protected Routes */}
        <Route
          path="/booking/:id"
          element={
            <>
              <SignedIn>
                <BookingPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <>
              <SignedIn>
                <MyBookings />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
