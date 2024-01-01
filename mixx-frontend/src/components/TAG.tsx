import { Link, useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import { BsTagFill } from "react-icons/bs";
import { MdAddComment, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillClockCircle, AiFillPlusCircle } from "react-icons/ai";
import "./Menu.css";
import { GoogleLogout } from "react-google-login";
import { LoginMetadata } from "../Models/LoginMetadata";
import { StorageService } from "../Services/StorageService";
import { AiFillHome, AiFillContacts, AiOutlineLogout } from "react-icons/ai";
import { SiFiles } from "react-icons/si";
import { useState } from "react";
import {
  MdFactCheck,
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Login from "../pages/Login";
import { close } from "ionicons/icons";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonPopover,
  IonRow,
} from "@ionic/react";
import "./URL.css";
import axios from "axios";
import { FileData } from "../Models/File";

interface TAGProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
  setTagPopOver: (value: boolean) => void;
  tagPopOver: boolean;
  maxLength: number;
  file: FileData;
  getData: () => void;
}
const URL: React.FC<TAGProps> = ({
  loginMetadata,
  loginfunction,
  setTagPopOver,
  tagPopOver,
  maxLength,
  file,
  getData
}) => {
  // const [videoUrl, setVideoUrl] = useState<string>("");
  var videoUrl: string;
  var start_time: number;
  var end_time: number;
  // const [end_time, setEndTime] = useState<number>(0);

  return (
    <IonPopover
      isOpen={tagPopOver}
      onDidDismiss={() => {
        setTagPopOver(false);
      }}
      class="urlPopover"
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/project/addCTT", {
          projectId: file._id,
          userId: loginMetadata.id,
          timeStampStart: start_time,
          timeStampEnd: end_time,
          tags: videoUrl,
        }).then((res: any) => {
          getData();
          console.log(res);
        })
        setTagPopOver(false);
      }}>
        <IonGrid class="urlGrid">
          <IonRow class="urlCloseWrapper">
            <IonIcon
              md={close}
              class="iconSize"
              size="large"
              onClick={() => {
                setTagPopOver(false);
              }}
              className="urlClose"
            ></IonIcon>
          </IonRow>
          <IonRow class="urlText">Add tag</IonRow>
          <div style={{ display: "flex", flexDirection: "column", height: "7vh" }}>
            <IonRow class="urlInputWrapper">
              <IonInput
                required={true}
                placeholder="Enter tag"
                class="urlInput"
                value={videoUrl}
                onIonChange={(e) => {
                  videoUrl = e.detail.value ? e.detail.value : "";
                }}
              ></IonInput>
            </IonRow>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span style={{ position: "relative", bottom: "50px", backgroundColor: "#0744C6", color: "white", borderRadius: "10px 0px 0px 10px" }}>
                <IonRow style={{ width: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <IonInput
                    required={true}
                    class="numberInput"
                    value={start_time}
                    type="number"
                    placeholder="00"
                    // min={0}
                    // max={maxLength}
                    onIonChange={(e) => {
                      start_time = parseInt(e.detail.value);
                    }}
                  ></IonInput>
                  {/* <IonCol>
                    &nbsp;&nbsp;&nbsp; :
                  </IonCol>
                  <IonCol>
                    <IonInput
                      required={true}
                      class="numberInput"
                      value={start_time_sec}
                      placeholder="00"
                      type="text"
                      maxlength={2}
                      onIonChange={(e) => {
                        if (e.detail.value <= "59") {
                          setStartTimeSec(e.detail.value);
                        }


                      }}
                    ></IonInput> */}
                </IonRow>
              </span>
              <span style={{ position: "relative", bottom: "50px", display: "flex", alignItems: "center", backgroundColor: "#0744C6", color: "white" }}>to</span>
              <span style={{ position: "relative", bottom: "50px", backgroundColor: "#0744C6", color: "white", borderRadius: "0px 10px 10px 0px" }}>
                <IonRow style={{ width: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <IonCol>
                    <IonInput
                      required={true}
                      class="numberInput"
                      value={end_time}
                      type="number"
                      placeholder="00"
                      // min={0}
                      onIonChange={(e) => {
                        end_time = parseInt(e.detail.value);
                      }}
                    // max={maxLength}
                    ></IonInput>
                  </IonCol>
                  {/* <IonCol>
                    &nbsp;&nbsp;&nbsp; :
                  </IonCol>
                  <IonCol>
                    <IonInput
                      required={true}
                      class="numberInput"
                      value={start_time_sec}
                      placeholder="00"
                      type="text"
                      maxlength={2}
                      onIonChange={(e) => {
                        if (e.detail.value <= "59") {
                          setStartTimeSec(e.detail.value);
                        }


                      }}
                    ></IonInput> */}
                </IonRow>
              </span>
            </div>
          </div>
          <IonRow>
            <IonButton
              class="urlSubmit"
              type="submit"
            >
              Add tag
            </IonButton>
          </IonRow>
        </IonGrid>
      </form>
    </IonPopover >
  );
};

export default URL;
