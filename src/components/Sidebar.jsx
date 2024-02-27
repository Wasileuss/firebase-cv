import React from 'react';
import contacts from '../data/contacts.json';
import avatar from '../assets/images/photo.webp';
import { LuSmartphone } from "react-icons/lu";
import { FiMail } from "react-icons/fi";
import { SiSkypeforbusiness } from "react-icons/si";
import { PiTelegramLogo } from "react-icons/pi";
import { TbFileDownload } from "react-icons/tb";

const iconArr = [ LuSmartphone, FiMail, SiSkypeforbusiness, PiTelegramLogo, TbFileDownload ];

function Sidebar() {
    return (
        <div className='sidebar'>
            <img className='sidebar__avatar' src={avatar} alt="avatar" />
            <ul className='sidebar__list'>
                {contacts.map((item, idx) => {
                    const Icon = iconArr[idx];
                    return (
                        <li className='sidebar__item' key={idx}>
                            <Icon className='sidebar__icon' />
                            <a
                                className='sidebar__contact'
                                href={item.href} 
                                title={item.title}
                                target={item.target}
                                rel={item.rel}
                                aria-label={item.title}
                            >
                                {item.body}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;