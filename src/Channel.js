import styles from "./Channel.module.css";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChannelHome from "./ChannelHome";
import ChannelVideos from "./ChannelVideos";
import ChannelPlaylist from "./ChannelPlaylist";
import { ReactComponent as SingoQ } from './img/singo.svg';
import Loading from "./Loading";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function Channel(){
    const [tab,setTab]= useState(0);
    const ID = useParams();
    const [channelinfo, setChannelInfo]=useState([]);
    const [load, setLoad]=useState(false);

    const getItem=async()=>{
        const jfile = await(await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${ID.id}&part=snippet,brandingSettings,statistics&key=${API_KEY}`)).json();
        setChannelInfo(jfile.items[0]);
        if(jfile){
            setLoad(true);
        }
    }

    useEffect(()=>{
        getItem();
    },[])

    useEffect(()=>{
    },[tab])
    
    const likes=(count)=>{
        if(count>10000){
            if(count>100000){
                return `${Math.floor(count/10000)}만`;
            }else{
                return `${(count/10000).toFixed(1)}만`;
            }
        }else{
            if(count<1000){
                return `${count}천`;
            }else{
                return `${(count/1000).toFixed(1)}천`;
            }
        }
    }

    function TabContent({props}){
        if(props === 0){
            return <div>
                <ChannelHome id={channelinfo.brandingSettings.channel.unsubscribedTrailer} channel={ID.id} />
            </div>
        }else if(props === 1) {
            return <div>
                <ChannelVideos id={ID.id}/>
            </div>
        }else if(props === 2){
            return <div>
                <ChannelPlaylist channel={ID.id}/>
            </div>
        }else if(props === 3){
            return <div>커뮤니티 제작 불가</div>
        }else if(props === 4){
            return <div>채널 제작 불가</div>
        }else if(props === 5){
            return <div>
                <div className={styles.infomation}>
                    <div className={styles.descript}>
                        <div>
                            <p>설명</p>
                            <p>{channelinfo.snippet.description}</p>
                        </div>
                        <div>
                            <p>세부정보</p>
                            <p>
                                <span>위치 : </span>
                                <span>{channelinfo.snippet.country}</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.stat}>
                        <p>통계</p>
                        <p>가입일: {(channelinfo.snippet.publishedAt).slice(0,10)}</p>
                        <p>조회수 {channelinfo.statistics.viewCount}</p>
                        <p>
                            <SingoQ/>
                        </p>
                    </div>
                </div>
            </div>
        }
      }
    

    return(
        <div className={styles.page}>
            <Menu/>
            <div className={styles.box}>
                { load ?(
                    <div className={styles.height}>
                        <div className={styles.banner}>
                            <img src={(channelinfo.brandingSettings.image) ? channelinfo.brandingSettings.image.bannerExternalUrl : null}/>
                        </div>
                        <div className={styles.name}>
                            <div className={styles.logo}>
                                <img src={channelinfo.snippet.thumbnails.high.url}/>
                            </div>
                            <div className={styles.channel}>
                                <div>
                                    <div className={styles.title}>{channelinfo.snippet.title}</div>
                                    <div className={styles.subs}>구독자 {likes(channelinfo.statistics.subscriberCount)}명</div>
                                </div>
                                <div>
                                    <button className={styles.subbutton}>구독</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul className={styles.tab}>
                                <li style={tab===0 ? {color:'#eeeeee'} : null} onClick={()=>{setTab(0)}}>홈</li>
                                <li style={tab===1 ? {color:'#eeeeee'} : null} onClick={()=>{setTab(1)}}>동영상</li>
                                <li style={tab===2 ? {color:'#eeeeee'} : null} onClick={()=>{setTab(2)}}>재생목록</li>
                                <li style={tab===3 ? {color:'#eeeeee'} : null} onClick={()=>{setTab(3)}}>커뮤니티</li>
                                <li style={tab===4 ? {color:'#eeeeee'} : null} onClick={()=>{setTab(4)}}>채널</li>
                                <li style={tab===5 ? {color:'#eeeeee'} : null} onClick={()=>{setTab(5)}}>정보</li>
                            </ul>
                        </div>
                        <div className={styles.tabpage}>
                            <div className={styles.container}>
                                <TabContent props={tab}/>
                            </div>
                        </div>
                    </div>
                ):(
                    <Loading sec={1500}/>
                ) }
            </div>
        </div>
    )
}

export default Channel;