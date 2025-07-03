import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import LoginIcon from "@mui/icons-material/Login";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "./MainNav.css";
import PersonIcon from "@mui/icons-material/Person";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100,
  },
});

function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const [isPSHOW, setIsPShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isShow, setIsShow] = useState(true);

  const profileShow = (e) => {
    setIsPShow(!isPSHOW);
  };

  var p_show = isPSHOW ? "profile-show" : null;

  const Logout = () => {
    setIsLoggedIn(false);
    navigate("/login");
    profileShow();
    sessionStorage.clear();
    localStorage.clear();
    removeCookie("token");
  };

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    } else if (value === 4) {
      navigate("/login");
    }
  }, [value, navigate]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token || location.pathname.includes("/login")) {
        navigate("/login");
        setIsLoggedIn(false);
        removeCookie("token");
        localStorage.clear();
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:8989",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          localStorage.setItem("email", user.email);
          localStorage.setItem("firstName", user.firstName);
          localStorage.setItem("lastName", user.lastName);
          setIsLoggedIn(true);
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
    const handelLogoutEvent = () => {
      setIsLoggedIn(false);
    };

    window.addEventListener("storage", handelLogoutEvent);

    return () => {
      window.removeEventListener("storage", handelLogoutEvent);
    };
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const userName = `${firstName} ${lastName}`;
    setUserName(userName);
    setEmail(email);
  });

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
      {isLoggedIn ? null : (
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Login"
          icon={<LoginIcon />}
        />
      )}
      {isLoggedIn ? (
        <BottomNavigationAction
          style={{ color: "white" }}
          label={userName}
          icon={<PersonIcon />}
          onClick={profileShow}
        />
      ) : null}
      {isLoggedIn ? (
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Logout"
          icon={<LogoutIcon />}
          onClick={Logout}
        />
      ) : null}
      <div className={`sideBar ${p_show}`} onClick={profileShow}>
        <div className="email">{email}</div>
        <div className="profile">
          <PersonIcon style={{ color: "white", fontSize: "30px" }} />
        </div>
        <div className="username">{userName}</div>
        <div className="logout" onClick={Logout}>
          Logout
        </div>
      </div>
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;
