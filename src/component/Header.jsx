import React from 'react'
import { FaPlay, FaSearch } from "react-icons/fa"
import header from '../assets/cloud kitchen.jpeg'
const Header = () => {
    return (
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
            <div className="container mx-auto py-[16vh]">
                <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
                    <div className="lg:w-[32rem] w-full flex flex-col space-y-6">
                        <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl">
                            Place your Order.   <span className="text-[#f54748]">Sitback & Relax !</span>  <span className="text-[#Fdc55e]">We Deliver your Order</span>
                        </div>
                        <div className="lg:text-xl text-[#191919] md:text-lg text-base">
                        A commercial kitchen for the purpose of preparing food for delivery or takeout only, with no dine-in customers. 
                        </div>



                    </div>
                    <img src={header} className=' h-[28rem] mx-auto justify-end' alt="" />
                </div>

            </div>
        </div>
    )
}

export default Header