import { useParams } from "react-router-dom";
import styles from "./SearchVideo.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Videos from "./Videos";
import Menu from "./Menu";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function SearchVideo(){
    let params = useParams();
    let value=encodeURI(params.id);
    const [result,setResult]=useState([]),
    [loading,setLoading]=useState(true);

    const getResult=async()=>{
        try{
            const json = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${value}&part=snippet&key=${API_KEY}&regionCode=KR`);
            setResult(json.data);
            setLoading(false);
        }catch(e){
            console.log("Result Load Error");
        }
    }

    useEffect(()=>{
        getResult();
    },[])

    return(
        <div className={styles.box}>
            <Menu/>
            {loading ? (
                <Loading/>
            ):(
                <div className={styles.container}>
                    {result.items.map((item)=>(
                        <Videos
                        thmbnails_high={item.snippet.thumbnails.medium.url}
                        channelId={item.snippet.channelId}
                        title={item.snippet.title}
                        channelTitle={item.snippet.channelTitle}
                        publishedAt={item.snippet.publishedAt}
                        id={item.id}
                        viewCount={1}
                        key={item.id}
                        description={item.snippet.description}
                        format={false}
                        />
                        ))}
                </div>
            )}
        </div>
    )
}

export default SearchVideo;