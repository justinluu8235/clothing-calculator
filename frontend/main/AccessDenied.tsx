import React from 'react'
import { Link } from "react-router-dom";

export default function AccessDeniedOrLogin() {
    return (
        <p>Please <Link to="/app/login">log in</Link> to view this page. 
        If you are already logged in, you may not have access to this page</p>
    )
}