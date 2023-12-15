import styles from "./components.module.css"

const UserProfileCard = ({ user, userInformation }) => {
    return (
        <main>
        <div className={styles.UserProfile}>
            <h2 className={styles.Label}>name:</h2>
            <p className={styles.UserInfo}>{user?.name}</p>
            <h2 className={styles.Label}>email:</h2>
            <p className={styles.UserInfo}>{userInformation?.email}</p>
            <h2 className={styles.Label}>userID:</h2>
            <p className={styles.UserInfo}>{user?.userId}</p>
        </div>
        <div className={styles.UserProfile}>
            <h2 className={styles.Label}>your friends:</h2>

        </div>
        </main>
    );
};

export default UserProfileCard;