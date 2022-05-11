import { useState } from "react";
import styles from "./Loading.module.css";

function Loading({sec}){
    const [time,setTime]=useState(false);
    setTimeout(() => {
        setTime(true)
    },sec);
    return(
        <div>
            {time ? (
                <div></div>
            ) : (
                <div className={styles.loading}>
                    <div className={styles.animate}>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Loading;