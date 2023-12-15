import styles from "./components.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'


const FindUserCard = ({ user}) => {
    return (
        <div className={styles.Posts}>
            <a className={styles.Label}><FontAwesomeIcon icon={faUser}/> name:{user?.name}</a>
            <button className={styles.button}>Add</button>
        </div>
    );
};

export default FindUserCard;