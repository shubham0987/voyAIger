// Redirect root to the configured home page
import { PAGES } from "../lib/routes";

export default function Home() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: PAGES.HOME,
      permanent: false,
    },
  };
}
