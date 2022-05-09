import styles from "./PlaylistVideo.module.css";
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/ko';

function PlaylistVideo({thumbnail,title,channel,publish,channelID,videoID}){
    const long=(text,size)=>{
        return (text.length>size ? text.slice(0,size-3)+"..." : text);
    }
    return(
        <Link to={`/ShowVideo/${videoID}`} className={styles.box}>
            <div className={styles.thumb}>
                <img src={thumbnail}/>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{long(title,40)}</div>
                <div className={styles.grey}>
                    <Link to={`/Channel/${channelID}`} className={styles.channel}>{channel}</Link>
                    <div>
                        <Moment fromNow>{publish}</Moment>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaylistVideo;