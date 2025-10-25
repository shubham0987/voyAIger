// Redirect root to /login by default
export default function Home() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
