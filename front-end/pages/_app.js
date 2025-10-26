import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
return (
    <div className="font-display"> 
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
