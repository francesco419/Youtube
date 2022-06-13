import styles from "./Shorts.module.css";
import Menu from "./Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { ReactComponent as Good } from './img/good.svg';

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
    },[])

    function ShortVideos({thumbnails,title,channelTitle}){
        return(
            <div className={styles.short}>
                <div className={styles.shortvideo}>
                    <div className={styles.video}>
                        <img src={thumbnails}/>
                        <div className={styles.title}>
                            <p>{title}</p>
                            <div className={styles.name}>
                                <div className={styles.channelname}>
                                    <img src={thumbnails}/>
                                    <p>{channelTitle}</p>
                                </div>
                                <div className={styles.subscribe}>구독</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.good}>
                            <Good style={{fill:'#7e7e7e'}}/>
                            <p>좋아요</p>
                            <div className={styles.like}> 이 동영상이 마음에 듭니다.</div>
                        </div>
                        <div className={styles.bad}>
                            <Good style={{fill:'#7e7e7e',transform: 'rotate(180deg)'}}/>
                            <p>싫어요</p>
                        </div>
                        <p>댓글</p>
                        <p>공유</p>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Menu/>
            <div className={styles.box}>
                {loading ? <Loading/> :
                <div className={styles.container}>
                    {videos.items.map((item)=>(
                        <ShortVideos
                    thumbnails={item.snippet.thumbnails.high.url}
                    title={item.snippet.title}
                    channelTitle={item.snippet.channelTitle}
                    key={item.id.videoId}
                    />
                    ))}
                </div>
                }
            </div>
        </div>
    )
}

export default Shorts;