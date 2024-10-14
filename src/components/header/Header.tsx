import React from "react";
import { useUser } from '../../contexts/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation(); // Get current route
    const { t } = useTranslation();
    const { isAuthenticated } = useUser();

    return (
        <div className="absolute w-full top-0 left-0 z-[888]">
            <Container>
                {location.pathname !== '/vr-view' ? <SupportNav /> : null}
            </Container>
            {location.pathname === '/vr-view' ? null :  isAuthenticated  ? (
                <>
                    <SidebarMenu />
                    <div className="fixed top-0 py-2 bg-[#131515] right-0 w-full">
                       <div className="max-w-[1240px] mx-auto ">
                            <UserNav />
                        </div>
                    </div>
                </>
            ) : (
                <Container>
                    <div className="flex items-center justify-between">
                        <Logo />
                        {/* Conditionally render the Sign in button based on the current route */}
                        {location.pathname !== '/auth/signin' && (
                            <Button
                                label={t("Sign in")}
                                onClick={() => navigate('/auth/signin')}
                                small
                                full
                            />
                        )}
                    </div>
                </Container>
            )}
        </div>
    );
};

export default Header;
