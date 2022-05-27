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
    [loading,setLoading]=useState(true),
    [data,setData]=useState(false),
    [innerW,setInnerW]=useState('1098px');

    const resizeW=()=>{
        if(window.innerWidth<=1350)
        setInnerW(`${window.innerWidth-250}px`);
    }

    const getData=(data)=>{
        setData(data);
      }

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

    useEffect(()=>{
        window.addEventListener('resize', resizeW);
        return()=>{
            window.removeEventListener('resize', resizeW);
        }
    },[])

    return(
        <div className={styles.page}>
            <Menu
            getData={getData}
            />
            {loading ? (
                <Loading/>
            ):(
                <div className={styles.box} style={data ? {margin:'60px 0 0 72px'} : {margin:'60px 0 0 250px'}}>
                    <div className={styles.container} style={{maxWidth:innerW}}>
                        {result.items.map((item)=>(
                            <Videos
                            thmbnails_high={item.snippet.thumbnails.medium.url}
                            channelId={item.snippet.channelId}
                            title={item.snippet.title}
                            channelTitle={item.snippet.channelTitle}
                            publishedAt={item.snippet.publishedAt}
                            id={item.videoId}
                            viewCount={1}
                            key={item.videoId}
                            description={item.snippet.description}
                            format={false}
                            />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchVideo;