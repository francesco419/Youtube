import styles from "./Playlist.module.css";
import { useEffect, useState, useRef } from "react";
import PlaylistVideo from "./PlaylistVideo";
import axios from "axios";
import Loading from "./Loading";
import { ReactComponent as Arrow } from './img/arrow.svg';

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;
let count = 0;

function Playlist({id,title}){
    const error = 'https://www.rumblerum.com/wp-content/uploads/2021/09/private-video.png';
    const [playitem,setPlayitem] = useState([]);
    const [load, setLoad]=useState(false);
    const [move,setMove] = useState(0);
    const ref = useRef();

    
    const axi = async()=>{
        const tfile = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&part=snippet&maxResults=12&key=${API_KEY}`);
        if(tfile.data.items.length>2){
            setPlayitem(tfile);
            setLoad(true);
        }
    }

    const moveq=()=>{
        setMove(move => -1284);
    }

    function Slidebutton({position}){
        return(
            <div onClick={moveq} style={position ? {left:'-20px'} : {right:'-20px'}} className={styles.buttonposition}>
                <div className={styles.buttonstyle}>
                    <Arrow/>
                </div>
            </div>
        )
    }

    useEffect(()=>{

    },[])
    
    useEffect(()=>{
        axi();
        console.log(ref)
    },[])

    return(
        <div>
            {load ? (
                <div className={styles.playlist}>
                    <Slidebutton position={false}/>
                    <div className={styles.title}>
                        <span className={styles.playtitle}>{title}</span>
                        <span className={styles.playall}>▶ 모두재생</span>
                    </div>
                    <div className={styles.videos} ref={ref} style={{transform: `translateX(${move}px)`, transition:`transform .5s`}}>
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