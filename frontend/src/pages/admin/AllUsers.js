import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import moment from 'moment'
import Spinner from '../../components/Spinner';
import { BiSolidEdit } from "react-icons/bi";
import ChangeUserRole from '../../components/ChangeUserRole';
import { useBg } from '../../context/bg';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [auth] = useAuth();
    const [showLoader, setShowLoader] = useState(true);
    const [bg, setBg] = useBg();
    const [rolePopupData, setRolePopupData] = useState({id:'', name:'', email:'', role:''})

    // getting all users
    const getAllUsers = async()=>{
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/all-users/${auth?.user._id}`);
        setAllUsers(data);
        setShowLoader(false);
     }


    //  changeRoleHandler
    const changeRoleHandler = (id, name, email, role)=>{
        setRolePopupData({id, name, email, role});
          setBg({...bg, darkBg:true, userRole:true});
    }


    //  use effect
    useEffect(()=>{
    getAllUsers()
    },[]);

  return (
    showLoader?
    (<Spinner/>):
    (<div className='px-8 py-6'>
    <h1 className='text-xl font-semibold text-[#2c2c54]'>All Users</h1>
    <table className='userCustomTable'>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                allUsers.map((user, i)=>{
                    return (
                        <tr key={i}>
                            <td className='font-bold'>{i+1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.role?'Admin':'User'}</td>
                            <td>{moment(user?.createdAt).fromNow()}</td>
                            <td>
                           <BiSolidEdit onClick={()=>changeRoleHandler(user._id, user.name, user.email, user.role)} className='mx-auto text-md hover:text-[#FE4938] cursor-pointer'/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>

    {bg?.userRole && <ChangeUserRole
      id={rolePopupData.id}
      name={rolePopupData.name}
      email={rolePopupData.email}
      role={rolePopupData.role}
      allUsersHandler = {getAllUsers}
      />}
    
</div>)
  )
}

export default AllUsers