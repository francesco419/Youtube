import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import Videos from './Videos';
import Menu from './Menu';
import Loading from './Loading';
import axios from 'axios';

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function Home() {
  const [state,setState] = useState([]),
  [loading,setLoading]=useState(true),
  [data,setData]=useState(false);
  
  const count = "50";
    const getState=async()=>{
      try{
        const json = await axios.get(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&part=statistics,snippet&regionCode=KR&maxResults=${count}&key=${API_KEY}`);
        setState(json.data.items);
        setLoading(false);
      }catch(e){
        console.log('Fail to load API');
    }
  }

  const getData=(data)=>{
    setData(data);
    console.log(data)
  }
useEffect(()=>{
  getState();
},[]);

  return (
      <div className={styles.page}>
        <Menu
        json={state}
        getData={getData}
        />
        { loading ? <Loading/> : (
        <div className={styles.box} style={data ? {margin:'60px 0 0 72px'} : {margin:'60px 0 0 250px'}}>
            {state.map((item)=>(
              <Link style={{ textDecoration: 'none' }} to={`/ShowVideo/${item.id}`} state={item.snippet.channelId} key={item.id}>
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
              </Link>
            ))}
        </div>
        )}
    </div>
  );
}

export default Home;