import "./Menu.css";
import { LoginMetadata } from "../Models/LoginMetadata";
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
import { FileData } from "../Models/File";
import axios from "axios";
import secrets from "../secrets";

interface COMMENTProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
  setCommentPopOver: (value: boolean) => void;
  commentPopOver: boolean;
  file: FileData;
  getData: () => void;
}
const COMMENT: React.FC<COMMENTProps> = ({
  loginMetadata,
  loginfunction,
  setCommentPopOver,
  commentPopOver,
  file,
  getData
}) => {
  var videoUrl: string;
  var start_time: number;
  var end_time: number;

  return (
    <IonPopover
      isOpen={commentPopOver}
      onDidDismiss={() => {
        setCommentPopOver(false);
      }}
      class="urlPopover"
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        axios.post(`${secrets.API_BASE_URL}/project/addCTT`, {
          projectId: file._id,
          userId: loginMetadata.id,
          timeStampStart: start_time,
          timeStampEnd: end_time,
          comment: videoUrl,
        }).then((res: any) => {
          getData();
          console.log(res);
        })
        setCommentPopOver(false);
      }}>
        <IonGrid class="urlGrid">
          <IonRow class="urlCloseWrapper">
            <IonIcon
              md={close}
              class="iconSize"
              size="large"
              onClick={() => {
                setCommentPopOver(false);
              }}
              className="urlClose"
            ></IonIcon>
          </IonRow>
          <IonRow class="urlText">Add Comment</IonRow>
          <div style={{ display: "flex", flexDirection: "column", height: "7vh" }}>
            <IonRow class="urlInputWrapper">
              <IonInput
                required={true}
                placeholder="Enter comment"
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
                    onIonChange={(e) => {
                      start_time = parseInt(e.detail.value);
                    }}
                  ></IonInput>
                 
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
                      onIonChange={(e) => {
                        end_time = parseInt(e.detail.value);
                      }}
                    ></IonInput>
                  </IonCol>
                </IonRow>
              </span>
            </div>
          </div>
          <IonRow>
            <IonButton
              class="urlSubmit"
              type="submit"
            >
              Add Comment
            </IonButton>
          </IonRow>
        </IonGrid>
      </form>
    </IonPopover>
  );
};

export default COMMENT;
