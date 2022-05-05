import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import styles from "./ShowVideo.module.css";
import Header from "./Header";
import { useEffect, useState } from "react";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function ShowVideo(){
    let location = useLocation();
    const json = location.state;
    const [item,setItem]=useState([]);
    const getItem=async()=>{
        const jfile = await(await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${json.snippet.channelId}&part=statistics&key=${API_KEY}`)).json();
        setItem(jfile.items[0].statistics.subscriberCount);
    }
    useEffect(()=>{
        getItem();
    },[])
    
    console.log(item);
    return(
        <div>
            <Header/>
            <div className={styles.box}>
                <div className={styles.video}>
                    <div className={styles.thumbnail}>
                        <img src={json.snippet.thumbnails.high.url}/>
                    </div>
                </div>
                <div className={styles.videolist}>
                    <div>

                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        <div>
                            <div>
                                tag
                            </div>
                            <div>
                                {json.snippet.title}
                            </div>
                            <div>
                                조회수 {json.statistics.viewCount}회 · {json.snippet.publishedAt}
                            </div>
                        </div>
                        <div>
                            {json.statistics.likeCount}
                        </div>
                    </div>
                    <div className={styles.channel}>
                        <div>
                            icon
                        </div>
                        <div>
                            <div>
                                {json.snippet.channelTitle}
                            </div>
                            <div>
                                구독자 {item}
                            </div>
                            <div>
                                {json.snippet.description}
                            </div>
                            <div>
                                구독버튼
                            </div>
                        </div>
                    </div>
                    <div className={styles.comment}>
                        <div>
                            {json.statistics.commentCount}
                        </div>
                        <div>
                            정렬기준
                        </div>
                        <div>
                            댓글 추가...
                        </div>
                        <div>
                            comment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowVideo;