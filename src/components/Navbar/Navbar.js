import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

import styles from "@/components/Navbar/Navbar.module.css";
import UserDetail from '../UserDetailPopup/UserDetailPopup';
import { getUserDataFromLocalStorage } from '@/utils/storageHelper';

export default function Navbar() {
    const router = useRouter();

    const [showUserInfo, setShowUserInfo] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        setIsLoggedIn(getUserDataFromLocalStorage() ? true : false)
    },[])

    const toggleUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    const handleSignIn = async () => {
        await router.push("/auth");
        router.reload()
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.appName}>
                <Link className={styles.AppName} href="/">App Discovery</Link>
            </div>
            <div className={styles.userIconContainer}>
                {isLoggedIn ? (
                    <>
                        <FaUserCircle size={32} onClick={toggleUserInfo} />
                        <UserDetail isOpen={showUserInfo} onClose={toggleUserInfo} />
                    </>
                ) : (
                    <button onClick={handleSignIn} className={styles.signInButton}>
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
}
