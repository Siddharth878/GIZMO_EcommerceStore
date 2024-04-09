import React from 'react'
import { Link } from 'react-router-dom'



import SearchBar from '../layout/searchBar.js'

export default function Header() {
    return (

        <div className="container max-w-screen-xl mx-auto py-[2.4rem]  ">
            <nav className="Main-nav text-[2.0rem] font-normal flex justify-between items-center ">
                
                
                <ul className="flex gap-[3.2rem]">
                    <li>
                        <Link className="Main-nav-links hover:text-[#777] transition-all duration-300" to = "/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="Main-nav-links hover:text-[#777] transition-all duration-300" to = "/products">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link className="Main-nav-links about-btn hover:text-[#777] transition-all duration-300" to = "/about-me">
                            About
                        </Link>
                    </li>
                    <li>
                        <button id="dropdownHoverButton" data-dropdown-trigger="hover" data-dropdown-delay="200" data-dropdown-toggle="dropdownHover"  className="   font-normal hover:text-[#777] focus:outline-none rounded-lg  text-center inline-flex items-center " type="button">Products 
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg></button>
                        
                            <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-[1.6rem] shadow w-60 p-[1rem]">
                                <ul className="py-2 text-[1.8rem] " aria-labelledby="dropdownHoverButton">
                                    <li className= "flex items-center justify-center ">
                                        <Link to = "/products" className="block  py-[1rem]  hover:text-[#777] ">Gear</Link>
                                    </li>
                                    <li className= "flex items-center justify-center ">
                                        <Link to = "/products" className="block  py-[1rem] hover:text-[#777] ">Audio</Link>
                                    </li>
                                    <li className= "flex items-center justify-center ">
                                        <Link to = "/products" className="block  py-[1rem] hover:text-[#777] ">Tech</Link>
                                    </li>
                                    <li className= "flex items-center justify-center">
                                        <Link to = "/products" className="block  py-[1rem] hover:text-[#777] ">All</Link>
                                    </li>
                                </ul>
                            </div>
                    </li>
                </ul>


                    <p className= "font-[Raleway] text-[3.2rem] font-medium">
                        GIZMO
                    </p>
                     



                  <div className= "flex gap-[1.2rem]">
                     
                     <SearchBar/>
                      <Link to = "/login" className = "flex justify-center items-center gap-4">
                       <ion-icon className = "ion--icon block h-14 w-14 "name="person-outline" style = {{height:"3.2rem",width:"3.2rem"}}></ion-icon>
                      </Link>
                     <Link to = "/cart" className = "flex justify-center items-center">
                       <ion-icon className = "ion--icon block h-14 w-14 "name="cart-outline" style = {{height:"3.2rem",width:"3.2rem"}}></ion-icon>
                      </Link>
                   </div>



            </nav>
        </div>

    )
}
