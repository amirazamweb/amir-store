import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { BiSolidEdit } from "react-icons/bi";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    // get All orders
    const getAllOrders = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/product/all-orders`);
            if(data?.success){
                setAllOrders(data?.allOrders)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // use Effect
    useEffect(()=>{
        getAllOrders();
    }, [])


  return (
    <div className='px-8 py-6 max-h-[calc(100vh-104px)] h-full'>
       <h1 className='text-xl font-semibold text-[#2c2c54]'>All Orders</h1>
       <table className='userCustomTable'>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ordered At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {
                allOrders.map((order, i)=>{
                    return (
                        <tr key={i}>
                            <td className='font-bold'>{i+1}</td>
                            <td>{order?.buyer?.name}</td>
                            <td>{order?.buyer?.email}</td>
                            <td>{order?.status}</td>
                            <td>{moment(order?.createdAt).fromNow()}</td>
                            <td>
                           <BiSolidEdit className='mx-auto text-md hover:text-[#FE4938] cursor-pointer'/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
    </div>
  )
}

export default AllOrders