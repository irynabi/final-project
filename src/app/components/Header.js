import Link from "next/link"
import styles from "./components.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPersonCirclePlus, faRightToBracket, faRightFromBracket, faSquarePlus, faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons'

const Header = ({isLoggedIn, logoutUser}) => {
    return (
        <header className={styles.Header}>
            <Link href="/" className={styles.Name}><FontAwesomeIcon icon={faHouse}/> scrapbook</Link>
            <nav className={styles.HeaderNav}>
                {isLoggedIn && (
                    <>
                        <ul className={styles.ul}>
                            <li><Link href="/profile" className={styles.li}><FontAwesomeIcon icon={faUser}/> your profile</Link></li>
                            <li><Link href="/createPost" className={styles.li}> <FontAwesomeIcon icon={faSquarePlus}/> create</Link></li>
                            <li><Link href="/findUsers" className={styles.li}><FontAwesomeIcon icon={faUserPlus}/> find friends</Link></li>
                            <li><a className={styles.li} onClick={logoutUser}><FontAwesomeIcon icon={faRightFromBracket}/> logout</a></li>
                        </ul>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <ul className={styles.ul}>
                        <li><Link href="/login" className={styles.li}><FontAwesomeIcon icon={faRightToBracket}/> log in</Link></li>
                        <li><Link href="/createUser" className={styles.li}><FontAwesomeIcon icon={faPersonCirclePlus}/> create user</Link></li>
                        </ul>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;