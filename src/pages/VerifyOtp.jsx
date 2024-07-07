/* eslint-disable no-undef */
import  { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import axios from 'axios';
const backendUrl = import.meta.env
                ?import.meta.env.VITE_BE_URL //localhost
                :process.env.VITE_BE_URL; //cloud
const backendInstance = axios.create({
                baseURL : backendUrl,
                timeout: 10000,
});

const VerifyOtp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const { user } = useUserContext()
    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };
    const combinedOtp = parseInt(otp.join(''));
    console.log(combinedOtp)
    const navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = user?.user?.email;

        const dataOtp = { email, combinedOtp };

        try {
            const res = await backendInstance.post('/user/verifyotp', dataOtp);
            const data = res.data;
            if (data.success) {
              toast.success(data.message);
              navigate('/');
              location.reload();
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            console.error('There was an error!', error);
            toast.error('An error occurred. Please try again.');
          }
      
}


    return (

        <div className="relative pt-[18vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative w-full max-w-lg px-6 pt-10 mx-auto bg-white shadow-xl pb-9 rounded-2xl">
                <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {user?.user?.email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleOnSubmit}>
                            <div className="flex flex-col space-y-16">


                                <div className="flex items-center justify-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={digit}
                                            maxLength="1"
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="w-12 h-12 mx-2 text-xl text-center border border-gray-300 rounded"
                                        />
                                    ))}
                                </div>


                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button type='submit' className="flex flex-row items-center justify-center w-full py-5 text-sm text-center text-white bg-red-700 border border-none shadow-sm outline-none rounded-xl">
                                            Verify Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp