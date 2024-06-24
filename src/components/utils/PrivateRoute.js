import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function PrivateRoute() {
  const { currentUser } = useAuth()

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    currentUser ?
            <Outlet/>
        : <Navigate to="/signin" />
  );
}