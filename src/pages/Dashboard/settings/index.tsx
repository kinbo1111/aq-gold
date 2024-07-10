import React from "react";
import DashboardContainer from "../../../components/DashboardContainer";
import SettingsModal from "./SettingsModal";

const Settings: React.FC = () => {
  const handleCloseModal = () => {
  };

  return (
    <DashboardContainer>
      <SettingsModal isOpen={true} onClose={handleCloseModal} />
    </DashboardContainer>
  );
};

export default Settings;
