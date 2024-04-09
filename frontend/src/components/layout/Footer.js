import React from 'react'

export default function footer() {
  return (
    <div>
      <section className = "bg-[rgb(14,14,14)] h-[470px] border rounded-t-[8rem] flex flex-col items-center ">

          <div className= "flex justify-center items-start container text-white pt-[9.6rem] mx-auto max-w-screen-xl pb-[6.4rem] ">

                <div className= "first-col py-[1.6rem] flex flex-col justify-center items-center gap-[1.8rem]">
                        <a href = "/" className = "block">
                            <p className= "font-[Raleway] text-[4.4rem] font-light">
                                        GIZMO
                            </p>
                        </a>

                        <p className = "text-[1.8rem] block mb-[2.4rem] text-[rgb(187,187,187)]">
                        India's most premium and trusted Online Digital Marketplace 
                        </p>

                        <hr className="border-0 bg-[rgb(197,197,197)] h-[0.1px] w-[70%] mx-auto" />
                        

                        <div className= "social-link flex  justify-center gap-[2.4rem]">
                        <ion-icon class= "block h-10 w-10 social-Links" name="logo-facebook" style = {{height:"3.2rem",width:"3.2rem"}}></ion-icon>
                        <ion-icon class= "block h-10 w-10 social-Links" name="logo-twitter" style = {{height:"3.2rem",width:"3.2rem"}}></ion-icon>
                        <ion-icon class= "block h-10 w-10 social-Links" name="logo-instagram" style = {{height:"3.2rem",width:"3.2rem"}}></ion-icon>
                        <ion-icon class= "block h-10 w-10 social-Links" name="logo-linkedin" style = {{height:"3.2rem",width:"3.2rem"}}></ion-icon>
                        </div>

                </div>

            



                <div className="mx-auto  text-[1.8rem]  p-4 py-6 lg:py-8">
                        <div className="md:flex md:justify-between">
                    
                            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                                <div>
                                    <h2 className="mb-6  font-semibold text-[white] uppercase ">Contact Us</h2>
                                    <ul className="text-[rgb(197,197,197)] ">
                                        <li className="mb-4">
                                            <a onClick = {
                                                function foo(){
                                                    window.open("mailto:saxena.siddharth.2017061@gmail.com");
                                                }

                                            } href="/" className="hover:underline">Email</a>
                                        </li>
                                        <li>
                                            <a href="/" className="hover:underline">Visit website</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6  font-semibold text-[white] uppercase ">Follow us</h2>
                                    <ul className="text-[rgb(197,197,197)] ">
                                        <li className="mb-4">
                                            <a href="https://github.com/Siddharth878" className="hover:underline ">Github</a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/siddharth-saxena-902672202/" className="hover:underline">LinkedIn</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="mb-6  font-semibold text-[white] uppercase ">Legal</h2>
                                    <ul className="text-[rgb(197,197,197)] ">
                                        <li className="mb-4">
                                            <a href="/" className="hover:underline">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="/" className="hover:underline">Terms &amp; Conditions</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
          
            
            </div>
          </div>
          
            <hr className=" border-0 bg-[rgb(197,197,197)] h-[0.1px] w-[90%] mx-auto my-6" />
        

         <p className = "copyright text-[1.6rem] text-[rgb(197,197,197)] py-[1rem]">
            © 2023 SIDDHARTH SAXENA GIZMO™. All Rights Reserved.
         </p>
      </section>



      
    </div>
  )
}
