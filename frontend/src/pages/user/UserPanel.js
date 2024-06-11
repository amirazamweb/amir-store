import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../../components/Loader';
import { useAuth } from '../../context/auth';

const UserPanel = () => {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);

    // calling protected api
    useEffect(()=>{
        const authCheck = async()=>{
          const {data} = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/v1/auth/user`, 
            {token: `Bearer ${auth?.token}`}
          );
          if(data?.ok){
            setOk(true);
          }
        }

        auth.token && authCheck();
    }, [auth.token])

  return ok? <div>User Panle</div>:<Loader redirect={auth.token?'/':'/login'}/>
}

export default UserPanel;