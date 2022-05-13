import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChannelPlaylist.module.css";
import Loading from "./Loading";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function ChannelPlaylist({channel}){
    const [isexist,setIsexist] = useState(false);
    const [playlist,setPlaylist] = useState([]);
    const axi=async()=>{
        const json = await axios.get(`https://www.googleapis.com/youtube/v3/playlists?channelId=${channel}&part=snippet,status&maxResults=50&key=${API_KEY}`);
        console.log(json);
        if(json.data.items===null){
            console.log('empty');
        }else{
            setIsexist(true);
            setPlaylist(json);
        }
    }

    function Items({thumbnail,title,publish,}){
        return(
            <div className={styles.container}>
                <div className={styles.thumbnail}>
                    <img src={thumbnail}/>
                    <div className={styles.listnum}>
                        <div>N</div>
                        </div>
                    <div className={styles.overlay}>
                        <div>▶ 모두재생</div>
                        </div>
                    </div>
                <div className={styles.title}>{title}</div>
                {/* { publish>3 ? true : false} */}
                <div className={styles.view}>모든 재생목록 보기</div>
            </div>
        )
    }

    useEffect(()=>{
        axi();
    },[])
    return(
        <div>
            {isexist ? 
            (
            <div className={styles.box}>
                {playlist.data.items.map((item)=>(
                <Items 
                thumbnail={item.snippet.thumbnails.high.url}
                title={item.snippet.title}
                key={item.id}
                />))}
            </div>
            ):(
                <div>
                    <Loading sec={1500}/>
                    재생목록이 존재하지 않습니다.
                </div>
            )
            }
        </div>
    )
}

export default ChannelPlaylist;