import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { MoviesProvider } from "./context";

import Navbar from "./components/fixed/Navbar";
import Home from "./components/screens/Home";

import Footer from "./components/fixed/Footer";
import BookingScreen from "./components/screens/BookingScreen";
import Login from "./components/screens/Login";
import { UserContext } from "./UserContext";
import MyBookings from "./components/screens/Mybookings";

//Auth Check

function App() {
  const { user } = useContext(UserContext);
  const userStatus = JSON.parse(localStorage.getItem("userStatus"));
  return (
    <MoviesProvider>
      <Router>
        <div className="container-md bg-light p-2">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/showtime/:id">
              {!user && !userStatus ? (
                <Redirect to="/login" />
              ) : (
                <BookingScreen />
              )}
            </Route>
            <Route exact path="/mybookings">
              {!user && !userStatus ? <Redirect to="/login" /> : <MyBookings />}
            </Route>
            <Route exact path="/login">
              {user && userStatus ? <Redirect to="/" /> : <Login />}
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;
