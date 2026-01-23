import SignupForm from "../components/signup-form"
import SignupSidebar from "../components/signup-sidebar"

import styles from "../styles/signUp.module.css" // ✅ CSS Module

export default function SignUp() {
  return (
    <div className={styles.container}>
      <SignupSidebar />
      <SignupForm />
    </div>
  )
}
