import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { LoginMetadata } from "../Models/LoginMetadata";
import Contact from "./ContactUs";
import Home from "./Home";
import Files from "./Files";
import Play from "./Play";

interface PageProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
}

const Page: React.FC<PageProps> = ({ loginfunction, loginMetadata }) => {
  const { name } = useParams<{ name: string }>();

  const [screen, setScreen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (window.screen.width < 420) {
      setScreen(false);
    }
  }, []);

  if (name === "home") {
    return (
      <Home
        menu={menu}
        setMenu={setMenu}
        screen={screen}
        setScreen={setScreen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        loginfunction={loginfunction}
        loginMetadata={loginMetadata}
      />
    );
  } else if (name === "files") {
    return (
      <Files
        menu={menu}
        setMenu={setMenu}
        screen={screen}
        setScreen={setScreen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        loginfunction={loginfunction}
        loginMetadata={loginMetadata}
      />
    );
  } else if (name === "contact") {
    return (
      <Contact
        menu={menu}
        setMenu={setMenu}
        screen={screen}
        setScreen={setScreen}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        loginfunction={loginfunction}
        loginMetadata={loginMetadata}
      />
    );
  }

  return <Redirect to="/home" />;
};

export default Page;
