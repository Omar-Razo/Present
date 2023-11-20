import React, { useRef } from 'react';
import { useState } from 'react';
import { IconContext, House, Bell } from "@phosphor-icons/react";
//TODO import profile image and display in header
//TODO import notification component and display in header
// import { ImageIcon } from '../profile/ImageIcon';
import ToggleSwitch from './toggle';

function Header() {
 const [isToggled, setToggle] = useState(false);

 const handleToggle = () => {
   setToggle(isToggled => !isToggled);
 };

 return (
   <header className="fixed top-0 w-full bg-purple-500 flex justify-around items-center p-2">
    <IconContext.Provider
              value={{
                color: "black",
                size: 32,
                weight: "bold",
                mirrored: false,
              }}
            ><House />
     {/* <ImageIcon
                size="fill"
                bordered={true}
                shape="circle"
                imageSrc={item.imageSrc}
                alt=""
                linked={false}
                actionable={true}
                action={() => handleClick(index)}
              />  */}
     <ToggleSwitch
       isToggled={isToggled}
       onToggle={handleToggle}
       labelLeft="Friends"
       labelRight="Public"
     />
     {/* TODO Add notification component to insert here */}
     <Bell /></IconContext.Provider>
   </header>
 );
}

export default Header;

