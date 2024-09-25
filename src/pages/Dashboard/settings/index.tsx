import React, { useEffect } from "react";
import DashboardContainer from "../../../components/DashboardContainer";
import SettingsModal from "./SettingsModal";

const Settings: React.FC = () => {

  return (
    <DashboardContainer>
      <SettingsModal isOpen={true} />
    </DashboardContainer>
  );
};

export default Settings;
