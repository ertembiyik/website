import styles from "./page.module.css";
import Profile from "./Profile";
import { loadCV } from "@/lib/mdx-loader";

export default function Home() {
  const cv = loadCV();

  return (
    <div className={styles.page}>
      <Profile cv={cv} />
    </div>
  );
}
