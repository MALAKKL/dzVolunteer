import { useState } from "react"
import LoginSidebar from "../components/login-sidebar"
import LoginForm from "../components/login-form"

import styles from "../styles/signUp.module.css" // ✅ CSS Module

export default function LoginPage() {
  const [accountType, setAccountType] = useState("volunteer")
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div className={styles.container}>
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
