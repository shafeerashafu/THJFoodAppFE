/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useCartContext } from '../../context/cardContext';
import { useUserContext } from '../../context/userContext';
import axios from 'axios';
const backendUrl = import.meta.env
                ?import.meta.env.VITE_BE_URL //localhost
                :process.env.VITE_BE_URL; //cloud

//creating a axios instance
const backendInstance = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL : backendUrl,
    timeout: 10000,
});

const MyOrder = () => {
    const [order, getOrders] = useState([])
    const { user, setUser } = useUserContext()
    const getMyOrders = async () => {
        try {
            const res = await backendInstance.post(`/order/getorder`, {
                userId: user?.user._id,
                token: localStorage.getItem("token")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                getOrders(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyOrders()
    }, [])
    console.log(order)
    return (
        <div className="pt-14">
            <div
                className={
                    order?.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"
                }
            >
                <div className="container py-6 mx-auto">
                    <div className="w-full px-10 py-5 text-black bg-white rounded-md">
                        <div className="flex justify-between pb-8 border-b">
                            <h1 className="text-2xl font-semibold">My Orders</h1>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="w-2/5 text-xs font-semibold text-gray-900 uppercase">
                                Food  Details
                            </h3>
                            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-900 uppercase ">
                                Payment
                            </h3>
                            {/* <h3 className="w-1/5 text-xs font-semibold text-center text-gray-900 uppercase ">
                                Total Price
                            </h3> */}
                            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-900 uppercase ">
                                Date
                            </h3>

                            <h3 className="w-1/5 text-xs font-semibold text-center text-gray-900 uppercase ">
                                Total Price
                            </h3>
                        </div>
                        {order?.map((order) => {
                            return (
                                <OrderFoods
                                    key={order.id}
                                    order={order}
                                />
                            );
                        })}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder

const OrderFoods = ({ order }) => {


    return (
        <div className="flex items-center px-6 py-5 -mx-8 hover:bg-gray-100">
            <div className="flex w-2/5">
                <div className="grid grid-cols-3 ">
                    {
                        order?.items?.map((item) => <div className="flex flex-col justify-between flex-grow ml-4">
                            <div>
                                <img className="h-20" src={item?.food.foodImage} alt="" />
                            </div>
                            <span className="text-sm font-bold">{item?.food?.name}</span>
                            <span className="flex items-center space-x-4">
                                qty:
                                <span className="px-3 py-2 text-lg font-medium text-red-500 bg-slate-50">
                                    {item?.qty}
                                </span>

                            </span>


                        </div>)
                    }

                </div>


            </div>
            <div className="flex justify-center w-1/5 cursor-pointer">
                {order?.payment === false && <span className="text-sm font-bold">Not paid</span>}
                {order?.payment && <span className="text-sm font-bold text-green-600">paid</span>}

            </div>
            {/* <div className="flex justify-center w-1/5 cursor-pointer">
                <span className="text-sm font-bold">{order?.status
                }</span>
            </div> */}
            <span className="w-1/5 text-sm font-semibold text-center">
                {order?.createdAt}
            </span>
            <span className="w-1/5 text-sm font-semibold text-center">
                {order?.totalAmount
                }
            </span>
        </div>
    );
};