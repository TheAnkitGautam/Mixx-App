
import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { LoginMetadata } from '../Models/LoginMetadata';
import menuImg from '../Assets/hamburger.svg'
import './ContactUs.css';

interface ContactProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata,
    menu: boolean,
    sidebarOpen: boolean,
    screen: boolean,
    setMenu: (args: boolean) => void,
    setScreen: (args: boolean) => void,
    setSidebarOpen: (args: boolean) => void,
}

const Contact: React.FC<ContactProps> = ({
    loginfunction,
    loginMetadata, menu, setSidebarOpen, setScreen, setMenu, screen, sidebarOpen
}) => {

    useEffect(() => {
        // document.title = "Home - Mixx";
        if (window.screen.width < 420) {
            setScreen(false)
        }
    })

    return (
      <div className="container1">
        {screen ? (
          <Menu
            setMenu={setMenu}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
          />
        ) : menu ? null : (
          <img
            onClick={() => {
              setMenu(true);
              setSidebarOpen(true);
            }}
            className="menu"
            src={menuImg}
            alt=""
          />
        )}
        {menu ? (
          <Menu
            setMenu={setMenu}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            loginMetadata={loginMetadata}
            loginfunction={loginfunction}
          />
        ) : null}
        <div className="main"></div>
      </div>
    );
};

export default Contact;
