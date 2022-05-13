import styles from "./ChannelHome.module.css";
import { useEffect, useState } from "react";
import Moment from 'react-moment';
import 'moment/locale/ko';
import Playlist from "./Playlist";
import Loading from "./Loading";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function ChannelHome({id,channel}){
    const [trailer,setTrailer] = useState([]);
    const [playlists,setPlaylists] = useState([]);
    const [load, setLoad]=useState(false);
    const getTrailerAPI=async()=>{
        const tfile = await(await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,statistics&key=${API_KEY}`)).json();
        const pfile = await(await fetch(`https://www.googleapis.com/youtube/v3/playlists?channelId=${channel}&part=snippet,status&maxResults=5&key=${API_KEY}`)).json();
        if(tfile && pfile){
            setTrailer(tfile.items[0]);
            setPlaylists(pfile.items);
            setLoad(true);
        }
    }

    useEffect(()=>{
        getTrailerAPI();
    },[])

    const long=(text,size)=>{
        return (text.length>size ? text.slice(0,size-3)+"..." : text);
    }

    const view=(count)=>{
        if(count>10000){
            if(count>100000){
                return `조회수 ${Math.floor(count/10000)}만회`;
            }else{
                return `조회수 ${(count/10000).toFixed(1)}만회`;
            }
        }else{
            if(count<1000){
                return `조회수 ${count}천회`;
            }else{
                return `조회수 ${(count/1000).toFixed(1)}천회`;
            }
        }
    }

    return(
        <div className={styles.page}>
            {load ? (
            <div className={styles.trailer}>
                <div className={styles.trailerthumb}>
                    <img src={trailer.snippet.thumbnails.high.url}/>
                </div>
                <div className={styles.trailerinfo}>
                    <div>
                        {trailer.snippet.title}
                    </div>
                    <div className={styles.statistics}>
                        {view(trailer.statistics.viewCount)} · <Moment fromNow>{trailer.snippet.publishedAt}</Moment>
                    </div>
                    <div>
                        {long(trailer.snippet.description,120)}
                    </div>
                </div>
            </div>
            ) : (
                <Loading sec={1500}/>
            )}
            <div className={styles.playlist}>
                {playlists.map((list)=>(
                    <Playlist
                    id={list.id}
                    title={list.snippet.title}
                    />
                ))}
            </div>
        </div>
    )
}

export default ChannelHome;