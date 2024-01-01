import { Link } from "react-router-dom";
import sideimg from "./../Assets/sideimg.png";
import "./Menu.css";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../Services/StorageService";
import { AiFillHome } from "react-icons/ai";
import { SiFiles } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IonCol, IonRow } from "@ionic/react";
import avatar from "../Assets/avatar.svg";

interface MenuProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
  sidebarOpen: boolean;
  setSidebarOpen: (args: boolean) => void;
  setMenu: (args: boolean) => void;
}
const Menu: React.FC<MenuProps> = ({
  loginMetadata,
  loginfunction,
  sidebarOpen,
  setSidebarOpen,
  setMenu,
}) => {
  const logOut = () => {
    loginfunction(new LoginMetadata("-1"));
    StorageService.Logout();
    window.location.reload();
  };

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const href = window.location.href;
  const arr = href.split("/");
  const active = arr.slice(-1)[0];

  useEffect(() => { });
  return (
    <>
      <div className="side-img">
        <img src={sideimg} alt="" width={100} />
      </div>
      <nav className={sidebarOpen ? "sidebar sidebar-open" : "sidebar"}>
        <IonRow class="navTop">
          <IonCol size="8" class="avatarImgWrapper">
            <img
              className={sidebarOpen ? "avatar-open" : "avatar-close"}
              src={avatar}
              alt=""
            />
            {sidebarOpen && <div className="username">{loginMetadata.name}</div>}
          </IonCol>
          <IonCol
            class="arrowWrapper"
            size={sidebarOpen ? "2" : "3"}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
              setMenu(false);
            }}
          >
            {sidebarOpen ? (
              <MdKeyboardArrowLeft size="1.5em" />
            ) : (
              <MdOutlineKeyboardArrowRight size="1.5em" />
            )}
          </IonCol>
        </IonRow>
        <IonRow class="navMiddle">
          <Link
            to="/home"
            className={sidebarOpen ? "menuLink menuLink-open" : "menuLink"}
          >
            <div className={active === "home" ? "active" : ""}>
              <span className="icon">
                <AiFillHome size="1.2em" />
              </span>
              {sidebarOpen ? <span className="nav-title">Home</span> : null}
            </div>
          </Link>
          <Link
            to="/files"
            className={sidebarOpen ? "menuLink menuLink-open" : "menuLink"}
          >
            <div className={active === "files" ? "active" : ""}>
              <span className="icon">
                <SiFiles size="1.2em" />
              </span>
              {sidebarOpen ? <span className="nav-title">Files</span> : null}
            </div>
          </Link>
        </IonRow>
        <IonRow class="navBottom">
          <div>
            <div className="logout" onClick={logOut}>
              <FiLogOut />
              {sidebarOpen ? <span>Logout</span> : null}
            </div>
          </div>
        </IonRow>
      </nav>
    </>
  );
};

export default Menu;
