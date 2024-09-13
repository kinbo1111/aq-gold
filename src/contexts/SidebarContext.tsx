import React, { createContext, useContext, useState, ReactNode } from "react";

export type SidebarContextType = {
  collapsed: boolean;
  onCollapseToggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export type SidebarProviderProps = {
  children: ReactNode; 
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapseToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, onCollapseToggle }}>
      {children}
    </SidebarContext.Provider>
  );
};
