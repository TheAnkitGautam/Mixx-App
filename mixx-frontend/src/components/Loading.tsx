import { IonSpinner } from "@ionic/react";

interface ContainerProps { }

const Loading: React.FC<ContainerProps> = () => {
  return <IonSpinner name="crescent" class="spin" />;
};

export default Loading;
