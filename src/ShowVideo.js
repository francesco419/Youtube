import { Link,useNavigate,useParams  } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from "./ShowVideo.module.css";
import Header from "./Header";
import Moment from 'react-moment';
import 'moment/locale/ko';
import Loading from "./Loading";
import axios from "axios";

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function ShowVideo(){
    let params = useParams();
    const [subs,setSubs]=useState([]),
    [comment,setComment]=useState([]),
    [nocomment,setNocomment]=useState(false),
    [relatevideo,setRelateVideo]=useState([]),
    [videoinfo,setVideo]= useState([]),
    [loading,setLoading]= useState(true);

    const getVideoAPI=async()=>{
        let data;
        try{
            setVideo(null);
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${params.id}&part=snippet,statistics&key=${API_KEY}`);
            setVideo(response.data);
            data=response.data.items[0].snippet.channelId;
        } catch(e){
            console.log("Video Load Error");
        }
        getSubscriberAPI(data);
    }
    const getSubscriberAPI=async(channel)=>{
        try{
            setSubs(null);
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${channel}&part=statistics,snippet&key=${API_KEY}`);
            setSubs(response.data);
        } catch(e){
            console.log("Subscriber Load Error");
        }
        getCommentAPI();
    }
    const getCommentAPI=async()=>{
        try{
            setComment(null);
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?videoId=${params.id}&part=snippet&key=${API_KEY}`);
            setComment(response.data);
        } catch(e){
            console.log("Comment Load Error");
            setNocomment(true);
        }
        getRelateAPI();
    }
    const getRelateAPI=async()=>{
        try{
            setRelateVideo(null);
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${params.id}&type=video&maxResults=50&part=snippet&key=${API_KEY}`);
            setRelateVideo(response.data);
        } catch(e){
            console.log("RelateVideo Load Error");
        }
        setLoading(false);
    }
    const getItem=async()=>{
        getVideoAPI();
    }
    useEffect(()=>{
        getItem();
    },[])
    
    const view=(count)=>{
        const comma = ",";
        let out =count;
        let slicepart = count.length%3;
        if(slicepart===0){
            slicepart=3;
        }
        if(count.length>3){
            if(count.length<7){
                out=[count.slice(0,slicepart),comma,count.slice(slicepart,count.length)].join('');
                return out;
            }else if(count.length<10){
                out=[count.slice(0,slicepart),comma,count.slice(slicepart,(slicepart+3)),comma,count.slice((slicepart+3),count.length)].join('');
                return out;
            }else if(count.length>=10){
                out=[count.slice(0,slicepart),comma,count.slice(slicepart,(slicepart+3)),comma,count.slice((slicepart+3),(slicepart+6)),comma,count.slice((slicepart+6),(slicepart+9))].join('');
                return out;
            }
        }
        return out;
    }

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
    let navigate = useNavigate();

    const changeurl=(url)=>{
        console.log(url)
        navigate(url);
        navigate(0);
    }

    return(
        <div>
            <Header/>
            {loading ? (
                <Loading/>
            ):(
            <div className={styles.box}>
                <div className={styles.container}>
                    <div className={styles.video}>
                        <div className={styles.thumbnail}>
                            <img src={videoinfo.items[0].snippet.thumbnails.high.url}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.videotitle}>
                                <div className={styles.titleinfo}>
                                    <div className={styles.tag}>
                                        #tag
                                    </div>
                                    <div className={styles.title}>
                                        {videoinfo.items[0].snippet.title}
                                    </div>
                                    <div className={styles.viewoption}>
                                        <div className={styles.viewinfo}>
                                            조회수 {view(videoinfo.items[0].statistics.viewCount)}회 · {(videoinfo.items[0].snippet.publishedAt).slice(0,10)}.
                                        </div>
                                        <div className={styles.options}>
                                            <div>
                                                ☜{likes (videoinfo.items[0].statistics.likeCount)}
                                            </div>
                                            <div>
                                                ☞싫어요
                                            </div>
                                            <div>
                                                공유
                                            </div>
                                            <div>
                                                오프라인 저장
                                            </div>
                                            <div>
                                                클립
                                            </div>
                                            <div>
                                                저장
                                            </div>
                                            <div>
                                                ···
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.channel}>
                                <div className={styles.iconbox}>
                                    <div className={styles.icon}>
                                        <img src={subs.items[0].snippet.thumbnails.high.url}/>
                                        <Link to={`/Channel/${videoinfo.items[0].snippet.channelId}`} className={styles.absolutelink}></Link>
                                    </div>
                                </div>
                                <div>
                                    <Link style={{ textDecoration: 'none' }} to={`/Channel/${videoinfo.items[0].snippet.channelId}`} className={styles.channeltitle}>
                                        {videoinfo.items[0].snippet.channelTitle}
                                    </Link>
                                    <div className={styles.subs}>
                                        구독자 {likes(subs.items[0].statistics.subscriberCount)}
                                    </div>
                                    <div className={styles.description}>
                                        {videoinfo.items[0].snippet.description}
                                    </div>
                                </div>
                                <div>
                                    <button className={styles.subbutton}>구독</button>
                                </div>
                            </div>
                            {nocomment ? <h1> 댓글 기능을 사용할수 없습니다. </h1> :(
                            <div className={styles.comment}>
                                <div className={styles.commenttop}>
                                    <div className={styles.commentcount}>
                                        댓글 {view(videoinfo.items[0].statistics.commentCount)}개
                                    </div>
                                    <div>
                                        # 정렬기준
                                    </div>
                                </div>
                                <div>
                                    {/* <div className={styles.icon}>
                                        <img src='https://w7.pngwing.com/pngs/110/230/png-transparent-whatsapp-application-software-message-icon-whatsapp-logo-whats-app-logo-logo-grass-mobile-phones-thumbnail.png'/>
                                    </div>*/}
                                    {/* <input placeholder="댓글 추가..."> </input> */}
                                </div>
                                {comment.items.map((comments)=>(
                                <div className={styles.commentsection} key={comments.etag}>
                                    <div className={styles.commentimg}>
                                        <img src={comments.snippet.topLevelComment.snippet.authorProfileImageUrl}/>
                                    </div>
                                    <div>
                                        <div className={styles.commentinfo}>
                                            <div className={styles.commentchannel}>{comments.snippet.topLevelComment.snippet.authorDisplayName}</div>
                                            <div className={styles.commentdate}><Moment fromNow>{comments.snippet.topLevelComment.snippet.publishedAt}</Moment></div>
                                        </div>
                                        <div>{comments.snippet.topLevelComment.snippet.textOriginal}</div>
                                        <div className={styles.commentoption}>
                                            <div>☜{likes(comments.snippet.topLevelComment.snippet.likeCount)}</div>
                                            <div>☞</div>
                                            <div>답글</div>
                                        </div>
                                        <div className={styles.commentreply}>▼ 답글 {comments.snippet.totalReplyCount}개 보기</div>
                                    </div>
                                </div>   
                                ))}
                            </div>
                            )}
                        </div>
                    </div>
                    {
                        loading ? (
                            <Loading />
                        ) : (
                        <div className={styles.videolist}>
                            {relatevideo.items.filter(relate => relate.snippet !== undefined).map((relate)=>
                            (
                            <div key={relate.id.videoId}>
                                <div className={styles.relateV}>
                                    <div className={styles.relatethumb}>
                                        <img src={relate.snippet.thumbnails.high.url}/>
                                    </div>
                                    <div className={styles.relateinfo}>
                                        <div className={styles.relatetitle} title={relate.snippet.title}>
                                            {(relate.snippet.title).length>35 ? `${(relate.snippet.title).slice(0,32)}...` : (relate.snippet.title)}
                                        </div>
                                        <div>
                                            <Link to={`/Channel/${relate.snippet.channelId}`} style={{ textDecoration: 'none'}} key={relate.id.videoId} className={styles.relatechannel}>
                                                {relate.snippet.channelTitle}
                                                </Link>
                                        </div>
                                        <div>
                                            <div>
                                                조회수 2.5만회 ·  <Moment fromNow>{relate.snippet.publishedAt}</Moment>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/ShowVideo/${relate.id.videoId}`} onClick={()=>changeurl()} state={relate.snippet.channelId} style={{ textDecoration: 'none' }} className={styles.absolutelink} key={relate.id.videoId}>
                                    </Link>
                                </div>
                            </div>
                            )
                            )}
                        </div>
                        )
                    }
                </div>
            </div>)}
        </div>
    )
}

export default ShowVideo;