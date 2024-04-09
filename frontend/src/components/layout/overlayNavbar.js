
import React, { useContext, createContext, useState } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"



const SidebarContext = createContext()

export default function OverlayNavbar({children}) {



    const [expanded, setExpanded] = useState(false)

    const user = useSelector((state)=>state.user.user);
  
    return (
      <aside className="relative ">
        <nav className="h-full flex flex-col bg-[#fbfbfb] text-[2.4rem] px-[2.4rem] mb-[9.6rem]">
          <div className="slide-nav--btn-box p-4 pb-2 flex justify-between items-center">
            <p
              className={`overflow-hidden transition-all ${
              
                expanded ? "w-[30%]" : "w-0"
              } text-[3.2rem]`}>
              GIZMO
            </p>

            <motion.button whileHover= {{scale:1.04}}
              onClick={() => setExpanded((curr) => !curr)}
              className="p-[1.6rem] slide-nav--btn rounded-lg bg-gray-50 hover:bg-[rgb(187,187,187)]"
            >
              {expanded ? <ion-icon class = 'h-[3.2rem] w-[3.2rem]' name="close-circle-outline"></ion-icon>: <ion-icon class = 'h-[3.2rem] w-[3.2rem]' name="menu-outline"></ion-icon>}
            </motion.button>
          </div>
  
          {/* <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider> */}
  
          <div className="border-t flex p-3">
            <p className = "bg-[rgb(187,187,187)] p-[1.6rem] rounded-[5rem]"></p>
            <div
              className={`
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? "w-[30%] ml-3" : "w-0"}
            `}
            >
              <div className="flex flex-col justify-center items-start">
                <h4 className="font-semibold">{user?user.name:''}</h4>
                <span className="text-[1.6rem] text-gray-600">{user?user.email:'Not Logged in'}</span>
              </div>
              {/* <MoreVertical size={20} /> */}
            </div>
          </div>

          <div className=" flex p-3">
          
           </div>
            

          
        </nav>
        <figure className ="absolute px-[4.4rem]">
            <div className = {`overflow-hidden transition-all ${
              
              expanded ? "w-[100%]" : "w-0"
            } text-[3.2rem]  ${expanded ? "h-auto" : "h-0"}`} >
              
              
              <ul className="flex flex-col gap-[3.2rem] z-[1000]">
                    <li>
                        <Link className="Main-nav-links cursor-pointer hover:text-[#777] transition-all duration-300" to = "/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="Main-nav-links cursor-pointer hover:text-[#777] transition-all duration-300" to = "/products">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link className="Main-nav-linkscursor-pointer  about-btn hover:text-[#777] transition-all duration-300" to = "/">
                            About
                        </Link>
                    </li>
                    <li>
                        <button id="dropdownHoverButton" data-dropdown-trigger="hover" data-dropdown-delay="200" data-dropdown-toggle="dropdownHover"  className="  cursor-pointer  font-normal hover:text-[#777] focus:outline-none rounded-lg  text-center inline-flex items-center " type="button">Products 
                            {/* <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>*/}
                            </button> 
                        
                            <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-[1.6rem] shadow w-60 p-[1rem]">
                                <ul className="py-2 text-[1.8rem] " aria-labelledby="dropdownHoverButton">
                                    <li className= "flex items-center justify-center ">
                                        <Link to = "/" className="block  py-[1rem]  hover:text-[#777] ">Product V1</Link>
                                    </li>
                                    <li className= "flex items-center justify-center ">
                                        <Link to = "/" className="block  py-[1rem] hover:text-[#777] ">Product V2</Link>
                                    </li>
                                    <li className= "flex items-center justify-center ">
                                        <Link to = "/" className="block  py-[1rem] hover:text-[#777] ">Product V3</Link>
                                    </li>
                                    <li className= "flex items-center justify-center">
                                        <Link to = "/" className="block  py-[1rem] hover:text-[#777] ">Product V4</Link>
                                    </li>
                                </ul>
                            </div>
                    </li>
                </ul>
            </div>
        </figure>

      </aside>
    )
}

// export function SidebarItem({ icon, text, active, alert }) {
//     const { expanded } = useContext(SidebarContext)
    
//     return (
//       <li
//         className={`
//           relative flex items-center py-2 px-3 my-1
//           font-medium rounded-md cursor-pointer
//           transition-colors group
//           ${
//             active
//               ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//               : "hover:bg-indigo-50 text-gray-600"
//           }
//       `}
//       >
//         {icon}
//         <span
//           className={`overflow-hidden transition-all ${
//             expanded ? "w-52 ml-3" : "w-0"
//           }`}
//         >
//           {text}
//         </span>
//         {alert && (
//           <div
//             className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
//               expanded ? "" : "top-2"
//             }`}
//           />
//         )}
  
//         {!expanded && (
//           <div
//             className={`
//             absolute left-full rounded-md px-2 py-1 ml-6
//             bg-indigo-100 text-indigo-800 text-sm
//             invisible opacity-20 -translate-x-3 transition-all
//             group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
//         `}
//           >
//             {'Hello'}
//           </div>
//         )}
//       </li>
//     )
//   }
