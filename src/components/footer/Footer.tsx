import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  return (
    <div className="py-[100px] b-gray-900">
        <Container>
            <ul className="flex items-start justify-between flex-wrap">
                <li className="block">
                    <Link to="/" className="flex w-full text-white sub-1b">Company Information</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Company Profile</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Specified Commercial Transactions Law</Link>
                </li>
                <li className="block">
                    <Link to="/" className="flex w-full text-white sub-1b">Member Services</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Newsletter Subscription</Link>
                </li>
                <li className="block">
                    <Link to="/" className="flex w-full text-white sub-1b">Guide</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">What is Premium AQ Gold</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">FAQS</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Contact Us</Link>
                </li>
                <li className="block">
                    <Link to="/" className="flex w-full text-white sub-1b">Terms</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Website Terms of Use</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Membership Agreement</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Privacy Policy</Link>
                    <Link to="/" className="flex w-full body-1r gray-100 underline">Cookies Settings</Link>
                </li>
            </ul>
        </Container>
    </div>
  );
};
export default Footer;
