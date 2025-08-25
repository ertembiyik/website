import styles from "./page.module.css";
import Profile from "./Profile";
import { loadCVSync } from "@/lib/static-data-loader";

export const dynamic = 'force-static';

export default function Home() {
  const cv = loadCVSync();

  return (
    <div className={styles.page}>
      <Profile cv={cv} />
    </div>
  );
}
