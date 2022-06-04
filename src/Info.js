import styles from './Info.module.css';
import info from './img/info.png';

function Info({text}){
    return(
        <div className={styles.maincontainer}>
            <img src={info}/>
            <div className={styles.innercontainer}>
                <div className={styles.textcontainer}>
                    <p className={styles.text}>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Info;