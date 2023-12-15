import styles from "./components.module.css";

const PostCard = ({post}) => {
    return (
        <main>
        <div className={styles.Posts}>
        <h2 className={styles.Label}>scrapbook with</h2>
            <p className={styles.UserInfo}>{post.friend} </p>
            <img className={styles.Image} src={post.imageURL} alt=""/>
            <p className={styles.Label}>{post.postContent}</p>
        </div>
        </main>
    );
};

export default PostCard;