// import { createContext, useState, useEffect, ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { getToken, setToken, removeToken } from '../utils/token';

// interface AuthContextProps {
//   user: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       axios.get('https://todo-6y7s.onrender.com/verify-token')
//         .then(response => {
//           setUser(response.data.user);
//         })
//         .catch(() => {
//           removeToken();
//           router.push('/login');
//         });
//     }
//   }, [router]);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post('https://todo-6y7s.onrender.com/', { email, password });
//       const { token } = response.data;
//       setToken(token);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       setUser(email);
//       router.push('/dashboard');  // Redirect to dashboard after successful login
//     } catch (error) {
//       throw new Error('Invalid email or password');
//     }
//   };

//   const logout = () => {
//     removeToken();
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
























import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getToken, setToken, removeToken } from '../utils/token';

interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullname: string, email: string, password: string) => Promise<void>; // Add signup to the interface
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('https://todo-6y7s.onrender.com/verify-token')
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          removeToken();
          router.push('/login');
        });
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://todo-6y7s.onrender.com/', { email, password });
      const { token } = response.data;
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(email);
      router.push('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post('https://todo-6y7s.onrender.com/signup', { username, email, password });
      const { token } = response.data;
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(email);
      router.push('/login');  // Redirect to login after successful signup
    } catch (error) {
      throw new Error('Error creating account');
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>  {/* Add signup to the provider */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
