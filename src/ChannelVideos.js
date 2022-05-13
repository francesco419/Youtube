import axios from "axios";
import {useEffect,useState} from 'react'
import Loading from "./Loading";
import styles from "./ChannelVideos.module.css";
import PlaylistVideo from "./PlaylistVideo";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function ChannelVideos({id}){
    const [videos,setVideos] = useState([]);
    const [load, setLoad]=useState(false);

    const axi = async()=>{
        const json = await axios.get(`https://www.googleapis.com/youtube/v3/search?channelId=${id}&part=snippet&maxResults=50&key=${API_KEY}`);
        if(json){
            setVideos(json);
            setLoad(true);
        }
    } 

    useEffect(()=>{
        axi();
    },[])
    return(
        <div className={styles.container}>
            <div className={styles.name}>
                업로드한 동영상
            </div>
            {load ? (
                <div className={styles.box}>
                    {videos.data.items.map((play)=>(
                            <PlaylistVideo
                            thumbnail={play.snippet.thumbnails.high.url}
                            title={play.snippet.title}
                            channel={play.snippet.channelTitle}
                            channelID={play.snippet.channelId}
                            publish={play.snippet.publishedAt}
                            videoID={play.id.videoId}
                            type={true}
                            />
                        ))}
                </div>
            ):(
                <Loading sec={1500}/>
            )}
        </div>
    )
}

export default ChannelVideos;