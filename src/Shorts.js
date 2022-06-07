import styles from "./Shorts.module.css";
import Menu from "./Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function Shorts(){
    const [videos,setVideos]=useState([]),
    [loading,setLoading]=useState(true);

    const getVideos=async()=>{
        try{
            const json = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=손흥민,videoDuration=short,regionCode=KR,maxResults=10&part=snippet&key=${API_KEY}`);
            setVideos(json.data);
            setLoading(false);
        }catch(e){
            console.log("Result Load Error");
        }
    }

    useEffect(()=>{
        getVideos();
        console.log(videos)
    },[])

    function ShortVideos(){
        return(
            <div></div>
        )
    }

    return(
        <div>
            <Menu/>
            <div className={styles.box}>
                {loading ? <Loading/> :(
                    <div className={styles.short}>
                        <div className={styles.shortvideo}>
                            <div className={styles.video}>
                                <img src={videos.items[0].snippet.thumbnails.high.url}/>
                                <div className={styles.title}>
                                    <p>{videos.items[0].snippet.title}</p>
                                    <div className={styles.name}>
                                        <div className={styles.channelname}>
                                            <img src={videos.items[0].snippet.thumbnails.high.url}/>
                                            <p>{videos.items[0].snippet.channelTitle}</p>
                                        </div>
                                        <div className={styles.subscribe}>구독</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.menu}>
                                B
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shorts;