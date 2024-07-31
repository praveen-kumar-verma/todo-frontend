// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import useAuth from "../hooks/useAuth";
// import styles from "../styles/LoginForm.module.css";
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css"; // Optional for styling

// import Image from "next/image";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loginError, setLoginError] = useState(""); // New state for general login error
//   const { login } = useAuth();
//   const router = useRouter();
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePassword = (password: string) => {
//     const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleLogin = async (event: { preventDefault: () => void }) => {
//     event.preventDefault();
//     let isValid = true;

//     if (!email) {
//       setEmailError("Email should not be blank.");
//       isValid = false;
//     } else if (!validateEmail(email)) {
//       setEmailError("Invalid email format.");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!password) {
//       setPasswordError("Password should not be blank.");
//       isValid = false;
//     } else if (!validatePassword(password)) {
//       setPasswordError(
//         "Password must contain at least 1 uppercase letter, 1 special character, and be at least 8 characters long."
//       );
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     if (!isValid) return;

//     try {
//       await login(email, password);
//       router.push("/dashboard");
//     } catch (error) {
//       setLoginError("Invalid email or password"); // Set general login error
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h1>
//           Welcome to <span>Workflo!</span>
//         </h1>
//         <form onSubmit={handleLogin} className={styles.form}>
//           <Tippy content={emailError} visible={!!emailError} placement="right">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Your email"
//               className={styles.input}
//             />
//           </Tippy>

//           <div className={styles.passwordContainer}>
//             <Tippy
//               content={passwordError}
//               visible={!!passwordError}
//               placement="right"
//             >
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className={`${styles.input} ${styles.input2}`}
//               />
//             </Tippy>
//             <button
//               type="button"
//               className={styles.eyeButton}
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               <Image
//                 className={styles.showPassword}
//                 src="/image.png"
//                 alt="Show password"
//                 width={24}
//                 height={24}
//               />
//             </button>
//           </div>

//           {loginError && <div className={styles.loginError}>{loginError}</div>}
//           <button type="submit" className={styles.button}>
//             Login
//           </button>
//         </form>
//         <div className={styles.signupLink}>
//         Don’t have an account? <a href="/signup">Create a new account</a>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import styles from "../styles/LoginForm.module.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Optional for styling
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // New state for general login error
  const { login } = useAuth();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let isValid = true;

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
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      setLoginError("Invalid email or password"); // Set general login error
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>
          Welcome to <span>Workflo!</span>
        </h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <Tippy content={emailError} visible={!!emailError} placement="right">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className={styles.input}
            />
          </Tippy>

          <div className={styles.passwordContainer}>
            <Tippy
              content={passwordError}
              visible={!!passwordError}
              placement="right"
            >
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`${styles.input} ${styles.input2}`}
              />
            </Tippy>
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

          {loginError && <div className={styles.loginError}>{loginError}</div>}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <div className={styles.signupLink}>
          Don’t have an account? <Link href="/signup">Create a new account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
