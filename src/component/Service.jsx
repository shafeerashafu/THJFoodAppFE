import React from 'react'
import sheff from '../assets/delivery.jpeg'
const Service = () => {
    return (
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
                    <img src={sheff} alt="" className="h-[32rem] mx-auto justify-end" />
                    <div className=" w-full md:w-[32rem] flex flex-col space-y-6 ">
                        <div className="text-2xl md:text-3xl font-bold text-[#2e2e2e] lg:text-4xl">
                        On-Time Delivery, <span className="text-[#fdc55e]">
                            Every Time
                            </span> 
                        </div>
                        <div className="lg:text-lg text-[#191919] md:text-base text-sm">
                        Making this world a better place, one delivery at a time. Not your every day delivery agents. Not so cliche delivery service providers.
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Service