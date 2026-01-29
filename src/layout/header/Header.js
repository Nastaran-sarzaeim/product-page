"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import UserPanel from "./user-panel";

const menuItems = [
    { name: "خانه", href: "/" },
    { name: "فروشگاه", href: "/shop" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس با ما", href: "/contact" },
];

export default function Header() {
    const pathname = usePathname();
    const { user } = useUser();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logo}>
                    فروشگاه پوشاک
                </Link>

                {/* Desktop Menu */}
                <ul className={styles.menu}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name} className={styles.menuItem}>
                                <span
                                    className={`${styles.activeDot} ${isActive ? styles.activeDotVisible : ""
                                        }`}
                                />
                                <Link
                                    href={item.href}
                                    className={`${styles.link} ${isActive ? styles.activeLink : ""
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className={styles.actions}>
                    {!user && (
                        <Link href="/login" className={styles.authLink}>ورود / ثبت‌نام</Link>
                    )}

                    {user && <UserPanel />}

                    {/* Cart */}
                    <div className={styles.cart}>

                        <Image
                            src='/icon/ic_bag.svg'
                            alt="menu icon"
                            width={24}
                            height={24}
                        />
                    </div>

                    {/* Mobile Menu */}
                    <div className={styles.hamburger}>
                        <Image
                            src='/icon/ic_menu_item.svg'
                            alt="menu icon"
                            width={24}
                            height={24}
                            onClick={() => setIsOpen(true)}
                        />
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""
                    }`}
            >
                <Link href="/" className={styles.logo}>
                    فروشگاه پوشاک
                </Link>
                <nav className={styles.sidebarMenu}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`${styles.sidebarLink} ${isActive ? styles.sidebarActive : ""
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
