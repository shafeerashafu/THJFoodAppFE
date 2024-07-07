import  { useState } from 'react'
import avater from '../assets/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const backendUrl = import.meta.env
                ?import.meta.env.VITE_BE_URL //localhost
                // eslint-disable-next-line no-undef
                :process.env.VITE_BE_URL; //cloud

//creating a axios instance
const backendInstance = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL : backendUrl,
    timeout: 10000,
});
const Register = () => {
    const [image, setImage] = useState({})
    // eslint-disable-next-line no-unused-vars
    const [uploading, setUploading] = useState(false)
    const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await backendInstance.post('/all/upload-image', formData)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()

    const handleOnSUbmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordConfrim = form.confrimPassword.value;
        const profileImage = image?.url
        const userData = { name, email, profileImage, password, passwordConfrim };
        console.log(userData)

        backendInstance.post("/user/register", userData)
      .then((res) => {
        const data = res.data; // Axios automatically parses JSON response
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          toast.success(data.message);

          form.reset();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response) {
          
          toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          toast.error("No response received from server. Please try again later.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
      });
    };

    return (
        <div className="register">
            <div className="w-full mx-auto pt-[16vh]">
                <form className=' ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handleOnSUbmit}>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        <img src={image?.url || avater} alt="" className="w-32 h-32 mx-auto bg-contain rounded-full cursor-pointer" />
                    </label>
                    <label className='block mb-2 text-base text-center text-gray-900'>Profile Picture</label>
                    <input type="file" label="Image" name='myFile' id='file-upload' className='hidden' accept=' .jpeg, .png, .jpg' onChange={handleImage} />

                    <div className="mb-3">
                        <label className='block mb-2 text-sm text-gray-700' htmlFor='name'>
                            Name
                        </label>
                        <input type="text" placeholder='Enter your Name' name='name' className='w-full px-3 py-2 leading-tight text-gray-700 bg-white border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className="mb-3">
                        <label className='block mb-2 text-sm text-gray-700' htmlFor='email'>
                            Email
                        </label>
                        <input type="email" placeholder='Enter your email' name='email' className='w-full px-3 py-2 leading-tight text-gray-700 bg-white border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="mb-3">
                            <label className='block mb-2 text-sm text-gray-700'>
                                Password
                            </label>
                            <input type="password" placeholder='**********' name='password' className='w-full px-3 py-2 leading-tight text-gray-700 bg-white border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline' />
                        </div>
                        <div className="mb-3">
                            <label className='block mb-2 text-sm text-gray-700'>
                                Confrim Password
                            </label>
                            <input type="password" placeholder='**********' name='confrimPassword' className='w-full px-3 py-2 leading-tight text-gray-700 bg-white border rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline' />
                        </div>
                    </div>
                    <button className=" bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5" type='submit'>Register</button>

                    <Link to="/login" className=' text-[#fdc55e] mx-auto text-center font-semibold  mb-3 py-2 px-4 rounded'>
                        Already Account
                    </Link>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Register 