"use client"

import { useState } from "react"
import LoginSidebar from "../components/login-sidebar"
import LoginForm from "../components/login-form"
import "../styles/signUp.css"

export default function LoginPage() {
  const [accountType, setAccountType] = useState("volunteer")
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div className="container">
      <LoginSidebar />
      <LoginForm
        accountType={accountType}
        setAccountType={setAccountType}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  )
}
