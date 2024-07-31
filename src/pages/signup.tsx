import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/SignupForm.module.css";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Add this line
  const { signup } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let isValid = true;

    if (!username) {
      setUsernameError("Username should not be blank.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Email should not be blank.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password should not be blank.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    try {
      await signup(username, email, password);
      toast.success("User created successfully!", {
        onClose: () => 
            router.push("/login"),
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErrorMessage = error.response.data.error;
        setSignupError(apiErrorMessage || "Username or Email already used.");
      } else {
        setSignupError("Username or Email already used.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.card}>
        <h1>Create Account</h1>
        <form onSubmit={handleSignup} className={styles.form}>
         
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            className={styles.input}
          />
          {usernameError && <div className={styles.error}>{usernameError}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
          <div className={styles.passwordContainer}>
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`${styles.input} ${styles.input2}`}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                className={styles.showPassword}
                src="/image.png"
                alt="Show password"
                width={24}
                height={24}
              />
            </button>
          </div>
          {signupError && <div className={styles.signupError}>{signupError}</div>}
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          <button type="submit" className={styles.button}>
            Create Account
          </button>
        </form>
        <div className={styles.loginLink}>
          Already have an account? <Link href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
