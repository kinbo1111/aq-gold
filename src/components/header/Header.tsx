import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Container from "../Container";
import SupportNav from "./SupportNav";
import Logo from "./Logo";
import Button from "../Button";
import SidebarMenu from "../Sidebar";
import SearchBox from "../SearchBox";
import UserNav from "./UserNav";


const Header: React.FC<{ onToggleModal: () => void }> = ({ onToggleModal }) => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    return(
       <div className="fixed w-full top-0 left-0 z-[888]">
        <Container>
            <SupportNav/>
        </Container>
        {!isLoggedIn ? (
            <>
               <SidebarMenu/>
                <div className="fixed top-10 right-0 w-full">
                    <Container>
                        <div className="flex items-center justify-end gap-6">
                            <SearchBox/>
                            <UserNav/>
                        </div>
                    </Container>
                </div>
            </>
            ) : (
                <Container>
                    <div className="flex items-center justify-between">
                        <Logo/>
                        <Button
                            label="Sign in"
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