import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import "./Play.css";
import PlayList from "./PlayList";
import { useEffect, useState } from "react";
import { BsTagFill } from "react-icons/bs";
import { MdAddComment, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillClockCircle, AiFillPlusCircle } from "react-icons/ai";
import { IonCardContent, IonContent, IonPage } from "@ionic/react";
import Waveform from "./Waveform";
import COMMENT from "../components/COMMENT";
import TAG from "../components/TAG";
import { FileData } from "../Models/File";
import { CT } from "../Models/CT";
import axios from "axios";
// import Waveform from "./Waveform";

// const tracks = [
//   {
//     id: 0,
//     title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
//     url: "https://www.mfiles.co.uk/mp3-downloads/massenet-thais-meditation-violin-piano.mp3",
//   },
//   {
//     id: 1,
//     title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
//     url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
//   },
// ];

interface AudioProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
  menu: boolean;
  sidebarOpen: boolean;
  screen: boolean;
  setMenu: (args: boolean) => void;
  setScreen: (args: boolean) => void;
  setSidebarOpen: (args: boolean) => void;
  file: FileData;
}

const Audio: React.FC<AudioProps> = ({
  loginfunction,
  loginMetadata,
  menu,
  setSidebarOpen,
  setScreen,
  setMenu,
  screen,
  sidebarOpen,
  file,
}) => {
  const [selectedTrack, setSelectedTrack] = useState(file.audioURL);
  const [commentPopOver, setCommentPopOver] = useState(false);
  const [tagPopOver, setTagPopOver] = useState(false);
  const [maxlength, setMaxlength] = useState(0);
  const [ctdata, setCTData] = useState<CT[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.post("http://localhost:5000/project/getAllCTT", {
      projectId: file._id,
    }).then((res: any) => {
      setCTData(res.data);
    })
  }

  return (
    <IonPage className="container1 waveform">
      <IonContent scrollY={true} class="scrollFix">
        <Menu
          setMenu={setMenu}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          loginMetadata={loginMetadata}
          loginfunction={loginfunction}
        />
        <div className="waveform-container">

          <div className="main ">

            <Waveform url={selectedTrack} setMaxLength={setMaxlength} setCurrent={setCurrent} />
            {/* <PlayList
            tracks={tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          /> */}
          </div>
          <div className="tags">
            <div className="header">
              <div>
                <div>
                  <BsTagFill size="1.3em" />
                </div>
                <div className="title">Tags</div>
                <TAG
                  loginMetadata={loginMetadata}
                  loginfunction={loginfunction}
                  setTagPopOver={setTagPopOver}
                  tagPopOver={tagPopOver}
                  maxLength={maxlength}
                  file={file}
                  getData={getData}
                />
              </div>
              <div>
                <div>
                  <AiFillPlusCircle
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setTagPopOver(true);
                    }}
                    size="1.5rem"
                  />
                </div>
              </div>
            </div>
            {ctdata.map((ct) => {
              if (ct.timeStampStart <= current && ct.timeStampEnd >= current) {
                if (ct.tags) {
                  return (
                    <div>
                      <div className="info"><span>{ct.tags}</span></div>
                      {/* <div className="info"><span>{current}</span></div> */}
                      {/* <div className="info">{current}</div> */}
                    </div>
                  );
                }
              }

            })}
            {/* <div className="info"></div> */}
            {/* <div className="view-button">View All</div> */}
          </div>
          <div className="comments">
            <div className="header">
              <div>
                <div>
                  <MdAddComment size="1.3em" />
                </div>
                <div className="title">Comments</div>
                <COMMENT
                  loginMetadata={loginMetadata}
                  loginfunction={loginfunction}
                  setCommentPopOver={setCommentPopOver}
                  commentPopOver={commentPopOver}
                  file={file}
                  getData={getData}
                />
              </div>
              <div>
                <div>
                  <AiFillPlusCircle
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCommentPopOver(true);
                    }}
                    size="1.5rem"
                  />
                </div>
              </div>
            </div>
            {ctdata.map((ct) => {
              if (ct.timeStampStart <= current && ct.timeStampEnd >= current) {
                if (ct.comment) {
                  return (
                    <div>
                      <div className="info"><span>{ct.comment}</span></div>
                      {/* <div className="info"><span>{current}</span></div> */}
                      {/* <div className="info">{current}</div> */}
                    </div>
                  );
                }
              }

            })}
            {/* <div className="view-button">View All</div> */}

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Audio;
