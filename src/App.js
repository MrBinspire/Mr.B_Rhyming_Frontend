import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./components/Admin_page/AdminPage";
import HomeInputPage from "./components/Input_page/HomeInputPage";
import Login from "./components/HomePage/Login";
import Signup from "./components/HomePage/Signup";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Layout/Footer";
import PrivateRoute from "./utils/PrivateRoute";
import AcceptOrReject from "./components/AcceptOrReject/AcceptOrReject";
import { AuthProvider } from "./context/AuthContext";
import Search from "./components/SearchPage/Search";
import Blog from "./components/BlogPage/Blog";
import Community from "./components/CommunityPage/Community";
import AfterSearch from "./components/AfterSearch/AfterSearch";
import img from "./images/Mr.B.png";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-258417562-1";
ReactGA.initialize(TRACKING_ID);

const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/Admin/*"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Search />} />
            <Route
              path="/Accept-or-reject/*"
              element={
                <PrivateRoute>
                  <AcceptOrReject />
                </PrivateRoute>
              }
            />
            <Route path="/after-search" element={<AfterSearch />} />
            <Route
              path="/Blog/*"
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
            <Route
              path="/Community/*"
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              }
            />
            <Route path="*" component={"Invalid Path"} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
