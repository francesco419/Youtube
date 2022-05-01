import {useState,useEffect} from 'react';
import styles from "./Home.module.css";
import Videos from './Videos';
import Menu from './Menu';

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function Home() {
  const [state,setState] = useState([]);
  const count = "50";
    const getState=async()=>{
    const json = await(await fetch(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&part=statistics,snippet&regionCode=KR&maxResults=${count}&key=${API_KEY}`)).json();
    setState(json.items);
    console.log(json.items)
    }
useEffect(()=>{
  getState();
},[])

  return (
      <div className={styles.page}>
        <Menu
        json={state}
        />
        <videosection className={styles.box}>
            {state.map((item)=>(
                <Videos
                thmbnails_high={item.snippet.thumbnails.medium.url}
                channelId={item.snippet.channelId}
                title={item.snippet.title}
                channelTitle={item.snippet.channelTitle}
                publishedAt={item.snippet.publishedAt}
                id={item.id}
                viewCount={item.statistics.viewCount}
                key={item.id}
                description={item.snippet.description}
                format="true"
                />
            ))}
        </videosection>
    </div>
  );
}

export default Home;