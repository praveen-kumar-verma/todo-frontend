// import '../styles/';
import { AuthProvider } from '../context/AuthContext';
import { AppProps } from 'next/app';
import '../styles/global.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
