import React, { useState, useContext } from "react";
import { useUser  } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Container from "../Container";
import SupportNav from "./SupportNav";
import Logo from "./Logo";
import Button from "../Button";
import SidebarMenu from "../Sidebar";
import SearchBox from "../SearchBox";
import UserNav from "./UserNav";
import { useTranslation } from "react-i18next";

const Header: React.FC<{ onToggleModal: () => void }> = ({ onToggleModal }) => {
    
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isAuthenticated } = useUser();
 
    return(
       <div className="absolute w-full top-0 left-0 z-[888]">
        <Container>
            <SupportNav/>
        </Container>
             {isAuthenticated ? (
                <>
                    <SidebarMenu/>
                    <div className="fixed top-0 py-2 bg-[#131515] right-0 w-full">
                        <Container>
                                <UserNav/>
                        </Container>
                    </div>
                </>
            ) : (
                <Container>
                    <div className="flex items-center justify-between">
                        <Logo />
                        <Button
                            label={t("Sign in")}
                            onClick={() => navigate('/auth/signin')}
                            small
                            full
                        />
                    </div>
                </Container>
            )}
       </div>
    );
};

export default Header;