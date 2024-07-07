"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import styles from "../styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        href="/"
      >
        Home
      </Link>
      {!session && (
        <Link
          className={`${styles.link} ${
            pathname === "/login" ? styles.active : ""
          }`}
          href="/login"
        >
          Admin Login
        </Link>
      )}
    </nav>
  );
};
