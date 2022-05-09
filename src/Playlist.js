import styles from "./Playlist.module.css";
import { useEffect, useState } from "react";
import PlaylistVideo from "./PlaylistVideo";
import axios from "axios";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;
let count = 0;

function Playlist({id,title}){
    const error = "https://i.ytimg.com/vi/HeRrLWHOsIM/hqdefault.jpg";
    const [playitem,setPlayitem] = useState([]);
    const [load, setLoad]=useState(false);

    const axi = async()=>{
        const tfile = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&part=snippet,contentDetails&maxResults=12&key=${API_KEY}`);
        if(tfile.data.items.length>2){
            setPlayitem(tfile);
            setLoad(true);
        }
    }
    
    useEffect(()=>{
        axi();
    },[])

    return(
        <div>
            {load ? (
                <div className={styles.playlist}>
                    <div className={styles.title}>{title} ▶ 모두재생</div>
                    <div className={styles.videos}>
                        {playitem.data.items.map((play)=>(
                            <PlaylistVideo
                            thumbnail={play.snippet.thumbnails.high ? play.snippet.thumbnails.high.url : error}
                            title={play.snippet.title}
                            channel={play.snippet.channelTitle}
                            channelID={play.snippet.channelId}
                            publish={play.snippet.publishedAt}
                            videoID={play.contentDetails.videoId}
                            />
                        ))}
                    </div>
                </div>
            ):(
                <div> Loading </div>
            )}
        </div>
    )
}

export default Playlist;