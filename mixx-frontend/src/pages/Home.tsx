import Menu from "../components/Menu";
import { LoginMetadata } from "../Models/LoginMetadata";
import axios from 'axios';
import secrets from '../secrets';
// eslint-disable-next-line
import io, { Socket } from 'socket.io-client';

import "./Home.css";
import {
    AiFillFileAdd,
    AiOutlineSync,
    AiOutlineCloudUpload,
    AiOutlineLink,
} from "react-icons/ai";
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import URL from "../components/URL";
import { IonProgressBar } from "@ionic/react";
import Play from "./Play";
import menuImg from '../Assets/hamburger.svg'
import { FileData } from "../Models/File";



interface HomeProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata;
    menu: boolean,
    sidebarOpen: boolean,
    screen: boolean,
    setMenu: (args: boolean) => void,
    setScreen: (args: boolean) => void,
    setSidebarOpen: (args: boolean) => void,
}


const Home: React.FC<HomeProps> = ({ loginfunction, loginMetadata, menu, setSidebarOpen, setScreen, setMenu, screen, sidebarOpen }) => {
    const [dropDownFile, setDropDownFile] = useState(false);
    const [dropDownAudio, setDropDownAudio] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("mp3");
    const [showPopover, setShowPopover] = useState(false);
    const [showURL, setShowURL] = useState(false);
    const [convert, setConvert] = useState(false);
    const [file, setFile] = useState<FileData>(new FileData());
    const [selectedFileUpload, setSelectedFileUpload] = useState<File | null>(null);
    const supportedAudio = ["wav", "aac", "ogg", "mp3"];
    const [progress, setProgress] = useState({
        show: false,
        value: 0,
        progressMsg: "Uploading..."
    })

    const [videoUrl, setVideoUrl] = useState<string>('');


    useEffect(() => {
        document.title = "Home - Mixx";
        if (window.screen.width < 420) {
            setScreen(false)
        }
    }, [setScreen]);

    const handleDropdownFile = () => {
        setDropDownFile(!dropDownFile);
    };
    const handleDropdownAudio = () => {
        setDropDownAudio(!dropDownAudio);
    };
    const handleAudioSelect = (audio: SetStateAction<string>) => {
        setSelectedFormat(audio);
        setDropDownAudio(false);
    };



    const uploadFileToServer = () => {
        if (!selectedFileUpload) {
            axios.post(`${secrets.API_BASE_URL}/upload-url`, {
                videoUrl: videoUrl,
                audioFormat: selectedFormat,
                userId: loginMetadata.id
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                onUploadProgress: (progressEvent: any) => {
                    let percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress({
                        show: true,
                        value: percent,
                        progressMsg: "Uploading..."
                    })
                    if (percent === 100) {
                        setProgress({
                            show: true,
                            value: 0,
                            progressMsg: "Converting...",
                        })
                    }
                }
            }).then((res) => {
                setFile(res.data);
                setProgress({
                    show: false,
                    value: 0,
                    progressMsg: "Uploading..."
                })
                setSelectedFileUpload(null);
                setConvert(true)
            }
            ).catch((err) => {
                console.log(err);
            });
        }
        else {
            const formData = new FormData();
            formData.append("video", selectedFileUpload);
            formData.append("audioFormat", selectedFormat);
            formData.append("userId", loginMetadata.id);

            setProgress({
                show: true,
                value: 0,
                progressMsg: "Uploading..."
            })

            axios.post(`${secrets.API_BASE_URL}/upload-file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent: any) => {
                    let percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress({
                        show: true,
                        value: percent,
                        progressMsg: "Uploading..."
                    })
                    if (percent === 100) {
                        setProgress({
                            show: true,
                            value: 0,
                            progressMsg: "Converting...",
                        })
                    }
                }
            }).then((res) => {
                setFile(res.data);
                setProgress({
                    show: false,
                    value: 0,
                    progressMsg: "Uploading..."
                })
                setSelectedFileUpload(null);
                setConvert(true)
            }
            ).catch((err) => {
                console.log(err);
            }
            );
        }
    }

    if (convert) {
        return (
            <Play
                menu={menu}
                setMenu={setMenu}
                screen={screen}
                setScreen={setScreen}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                loginfunction={loginfunction}
                loginMetadata={loginMetadata}
                file={file}
            />
        );
    }
    return (
        <div className="container1">
            {screen ?
                <Menu setMenu={setMenu} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loginMetadata={loginMetadata} loginfunction={loginfunction} />
                :
                menu ?
                    null
                    :
                    <img onClick={() => { setMenu(true); setSidebarOpen(true) }} className="menu" src={menuImg} alt='' />
            }
            {menu ?
                <Menu setMenu={setMenu} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} loginMetadata={loginMetadata} loginfunction={loginfunction} />
                :
                null
            }
            <URL loginMetadata={loginMetadata} loginfunction={loginfunction} setShowPopover={setShowPopover} showPopover={showPopover} videoUrl={videoUrl} setShowURL={setShowURL} setVideoUrl={setVideoUrl} />
            <form className="main" onSubmit={(e) => {
                e.preventDefault();
            }}>

                {selectedFileUpload ? <div className="select_file">
                    <label htmlFor="video-upload" style={{ cursor: "pointer" }} title={selectedFileUpload.name}>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            id="video-upload"
                            style={{ display: "none" }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setSelectedFileUpload(event.target.files?.[0] || null);
                            }}
                            required
                        />
                        {selectedFileUpload.name.substring(0, 15)}{selectedFileUpload.name.charAt(15) ? "....." : null}</label>
                </div> : showURL ?
                    <div className="select_file">
                        <label title={videoUrl}>
                            {videoUrl.substring(0, 15)}{videoUrl.charAt(15) ? "....." : null}</label>
                    </div> :
                    !dropDownFile ? (
                        <div className="select">
                            <div>
                                <AiFillFileAdd size="1.3em" />
                            </div>
                            <label htmlFor="video-upload" style={{ cursor: "pointer" }}>
                                <input
                                    type="file"
                                    name="video"
                                    accept="video/*"
                                    id="video-upload"
                                    style={{ display: "none" }}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSelectedFileUpload(event.target.files?.[0] || null);
                                    }}
                                    required
                                />
                                Select Files</label>
                            <div onMouseMove={() => { setDropDownFile(true) }} >
                                <MdOutlineKeyboardArrowDown size="1.3em" />
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown" onMouseLeave={handleDropdownFile}>
                            <div className="dropdown-top">
                                <div>
                                    <AiFillFileAdd size="1.3em" />
                                </div>
                                <label htmlFor="video-upload" style={{ cursor: "pointer" }}>
                                    <input type="file" accept="video/*" id="video-upload" style={{ display: "none" }} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSelectedFileUpload(event.target.files?.[0] || null);
                                    }} required />
                                    Select Files</label>
                                <div>
                                    <MdKeyboardArrowUp size="1.3em" />
                                </div>
                            </div>
                            <label
                                htmlFor="video-upload"
                                className="dropdown-list"
                            >
                                <div className="dropdown-icon">
                                    <AiOutlineCloudUpload size="1.3em" />
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                    <input type="file" accept="video/*" id="video-upload" style={{ display: "none" }} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSelectedFileUpload(event.target.files?.[0] || null);
                                    }} required />
                                    From Device</div>
                            </label>
                            <div
                                className="dropdown-list"
                                onClick={() => {
                                    setShowPopover(true);
                                }}
                            >
                                <div className="dropdown-icon">
                                    <AiOutlineLink size="1.3em" />
                                </div>
                                <div>From URL</div>
                            </div>
                        </div>
                    )}
                {!dropDownAudio ? (
                    <div className="select">
                        <div>
                            <FaMusic size="1.3em" />
                        </div>
                        <div>{selectedFormat}</div>
                        <div onMouseMove={handleDropdownAudio} >
                            <MdOutlineKeyboardArrowDown size="1.3em" />
                        </div>
                    </div>
                ) : (
                    <div className="dropdown" onMouseLeave={() => {
                        setDropDownAudio(false)
                    }}>
                        <div className="dropdown-top">
                            <div>
                                <FaMusic size="1.3em" />
                            </div>
                            <div>{selectedFormat}</div>
                            <div >
                                <MdKeyboardArrowUp size="1.3em" />
                            </div>
                        </div>
                        {supportedAudio
                            .filter((audio) => audio !== selectedFormat)
                            .map((audio) => {
                                return (
                                    <div
                                        key={audio}
                                        onClick={() => handleAudioSelect(audio)}
                                        className="dropdown-list dropdown-list-audio"
                                        id={audio}
                                    >
                                        {audio}
                                    </div>
                                );
                            })}
                    </div>
                )}
                {progress.show === false ? <label className="select convert" htmlFor="video-convert">
                    <input onClick={uploadFileToServer} type="submit" id="video-convert" style={{ display: "none" }} />
                    <div>Convert</div>
                    <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                        <AiOutlineSync size="1.3em" />
                    </div>
                </label> : null}

                {progress.show &&
                    <div className="progressWrapper">
                        <IonProgressBar value={progress.value * 0.01} class="progress">
                        </IonProgressBar><div className="progressValue">{`${progress.progressMsg} ${progress.value > 0 ? `${progress.value}%` : ''}`}</div>
                    </div>
                }
            </form>
        </div>
    );
};

export default Home;
