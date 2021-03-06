import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import Videos from './Videos';
import Menu from './Menu';
import Loading from './Loading';
import axios from 'axios';
import Info from './Info';

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function Home() {
  let session = window.sessionStorage.getItem("setting");
  const [state,setState] = useState([]),
  [loading,setLoading]=useState(true),
  [data,setData]=useState(false),
  [intro,setIntro]=useState(session==true || session===null ? true : false);
  const informtext="현재 페이지는 유튜브를 클로닝한 페이지로서,\n각 페이지는 유튜브와 같이 설정을 하였으나 영상은 작동하지 않습니다.\nYoutube API 사용에 제한이 있으므로 API사용량이 초과되면 영상이 표시되지 않을 수 있습니다.";

  const INFOTEXT='● 현재 페이지에서 보여지는 영상들은 실제 Youtube와 다르게, 체널의 아이콘이나 영상의 길이가 표시되지 않는데, 이는 페이지에 사용한 API호출에서 따로 아이콘 혹은 영상길이에 대한 정보를 제공하지 않았고 각각의 데이터를 불러오기에는 API 일일 한도 소모량이 크므로 불가피하게 표시 하지 못하였습니다.';

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

  const setSession=()=>{
    setIntro(false);
    const data = {setting: intro};
    sessionStorage.setItem("setting", JSON.stringify(intro));
  }

  const getData=(data)=>{
    setData(data);
  }

useEffect(()=>{
  getState();
},[]);

  return (
      <div className={styles.page}>
      {intro ? (<div className={styles.intro}>
          <div className={styles.inform}>
            <p>{informtext}</p>
            <button onClick={setSession} className={styles.confirm}>확인</button>
          </div>
        </div>): null}
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
      <Info text={INFOTEXT}/>
    </div>
  );
}

export default Home;