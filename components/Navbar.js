import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

function Navbar({ title, menu, showMenu, setShowMenu }) {
  return (
    <div className={"bg-black w-full justify-between flex items-center p-4 md:hidden"}>
      <h1 className="text-lg text-white font-medium">{title}</h1>
      {menu &&
        <div className="text-md text-white" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
      }
    </div>
  )
}

export default Navbar;