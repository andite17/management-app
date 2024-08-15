import { Outlet, Navigate } from 'react-router-dom'
import { checkToken } from './utils'
import React from 'react'

const PrivateRoutes : React.FC = () => {
    return checkToken() ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoutes