import styles from "./Playlist.module.css";
import { useEffect, useState } from "react";
import PlaylistVideo from "./PlaylistVideo";
import axios from "axios";
import Loading from "./Loading";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;
let count = 0;

function Playlist({id,title}){
    const error = "https://i.ytimg.com/vi/HeRrLWHOsIM/hqdefault.jpg";
    const [playitem,setPlayitem] = useState([]);
    const [load, setLoad]=useState(false);

    const axi = async()=>{
        const tfile = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&part=snippet&maxResults=12&key=${API_KEY}`);
        if(tfile.data.items.length>2){
            setPlayitem(tfile);
            setLoad(true);
        }
    }
    console.log(playitem)
    
    useEffect(()=>{
        axi();
    },[])

    return(
        <div>
            {load ? (
                <div className={styles.playlist}>
                    <div className={styles.title}>
                        <span className={styles.playtitle}>{title}</span>
                        <span className={styles.playall}>▶ 모두재생</span>
                    </div>
                    <div className={styles.videos}>
                        {playitem.data.items.map((play)=>(
                            <PlaylistVideo
                            thumbnail={play.snippet.thumbnails.high ? play.snippet.thumbnails.high.url : error}
                            title={play.snippet.title}
                            channel={play.snippet.channelTitle}
                            channelID={play.snippet.channelId}
                            publish={play.snippet.publishedAt}
                            videoID={play.snippet.resourceId.videoId}
                            type={true}
                            />
                        ))}
                    </div>
                </div>
            ):(
                <Loading sec={1500}/>
            )}
        </div>
    )
}

export default Playlist;