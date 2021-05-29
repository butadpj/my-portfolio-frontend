import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import TokenContextProvider from "../context/TokenContext";

// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <TokenContextProvider>
      <Component {...pageProps} />
    </TokenContextProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
export default MyApp;
