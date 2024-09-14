import Link from 'next/link';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styles from "@/components/Navbar/Navbar.module.css"
import UserDetail from '../UserDetailPopup/UserDetailPopup';

export default function Navbar() {
    const [showUserInfo, setShowUserInfo] = useState(false);

    const toggleUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.appName}>
                <Link className={styles.AppName} href="/">App Discovery</Link>
            </div>
            <div className={styles.userIconContainer} onClick={toggleUserInfo}>
                <FaUserCircle size={32} />
                <UserDetail isOpen={showUserInfo} onClose={toggleUserInfo} />
            </div>
        </nav>
    );
}

