import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/admin/AdminPanel';
import UserPanel from '../pages/user/UserPanel';
import AllUsers from '../pages/admin/AllUsers';
import AllProducts from '../pages/admin/AllProducts';

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"signup",
                element:<SignUp/>
            },
            {
                path:"user",
                element:<UserPanel/>,
            },
            {
                path:"admin",
                element:<AdminPanel/>,
                children:[
                    {
                        path:'all-users',
                        element: <AllUsers/>
                    },
                    {
                        path:'all-products',
                        element: <AllProducts/>
                    }
                ]
            }
        ]
    }
])

export default router;