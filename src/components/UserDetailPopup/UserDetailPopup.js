import { useEffect, useRef, useState } from 'react';
import styles from "@/components/UserDetailPopup/UserDetailPopup.module.css";
import { clearUserData, getUserDataFromLocalStorage } from '@/utils/storageHelper';
import { useRouter } from 'next/router';

const UserDetail = ({ isOpen, onClose }) => {
    const [user, setUser] = useState(null);
    const popupRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            const userData = getUserDataFromLocalStorage();
            if (userData) {
                setUser(userData);
            } 
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    const handleLogout = () => {

        clearUserData();
        setUser('');
        onClose();
        router.push("/");
    };
    const handleSignIn = async() => {
        await router.push("/auth");
        router.reload()
        onClose();

    };

    if (!isOpen) return null;

    return (
        <>
            <div ref={popupRef} className={styles.popupContainer}>
                <div className={styles.userDetails}>
                    {user ? (
                        <>
                            <p><b>{user.userName}</b></p>
                            <p><b>{user.userEmail}</b></p>
                            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                        </>
                    ) :
                        <button className={styles.signInButton} onClick={handleSignIn}> SignIn </button>
                    }
                </div>
            </div>
        </>
    );
};

export default UserDetail;
