import { useState } from 'react'
import { Link } from 'react-router-dom';

export function Nav() {
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: "Dashboard", src: "Share", path: "/" },
    { title: "Services", src: "Tool", path: "/Services" },
    { title: "Contract", src: "Contract", path: "/Contract" },
    { title: "Accounts", src: "Contact", gap: true, path: "/Accounts" },
    { title: "BlackList ", src: "Lock", path: "/BlackList" },
    { title: "Log ", src: "file", path: "/Log" },
    { title: "Search", src: "Seach", path: "/Search" },
    { title: "Setting", src: "Setting", gap: true, path: "/Settings" },
  ];
  return (
    <div className="relative  ">
      <div className={`${open ? "w-72" : "w-20"} p-5 pt-5 duration-300 h-screen bg-yellow-300 relative `}>
        <img src='./src/assets/control.png'
          className={`absolute cursor-pointer  rounded-full 
       -right-3 top-9 w-7 border-2 border-yellow-300 ${!open && "rotate-180"} `}
          onClick={() => setOpen(!open)} />
        <div>
          <div className='flex gap-x-4 items-center'>
            <img src='./src/assets/logo.svg'
              className={`cursor-pointer  duration-300 ${open && 'rotate-[360deg]'}`} width="40" />
            <h1 className={`text-gray-800 font-medium origin-left text-xl duration-300 ${!open && 'scale-0'}`}>
              Hello Service
            </h1>
          </div>
          <ul className='pt-6'>
            {Menus.map((menu, index) => (
              <Link to={menu.path}>
                <li key={index} className={`text-gray-800 text-sm cursor-pointer flex items-center gap-x-4 p-2
               hover:bg-slate-200 rounded-md ${menu.gap ? "mt-8" : "mt-2"}`}>
                  <img src={`./src/assets/${menu.src}.png`} />
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
                </li>
              </Link>))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Nav