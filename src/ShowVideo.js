import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from "./ShowVideo.module.css";
import Header from "./Header";
import Moment from 'react-moment';
import 'moment/locale/ko';

const API_KEY=process.env.REACT_APP_YOUTUBE_API_KEY;

function ShowVideo(){
    const vidId = useParams();
    let location = useLocation();
    const json = location.state;
    const [show,setShow]=useState(false);
    const [item,setItem]=useState([]);
    const [comment,setComment]=useState([]);
    const [relatevideo,setRelateVideo]=useState([]);
    const getItem=async()=>{
        const jfile = await(await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${json.snippet.channelId}&part=statistics&key=${API_KEY}`)).json();
        const jconmment = await(await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?videoId=${vidId.id}&part=snippet&key=${API_KEY}`)).json();
        setItem(jfile.items[0].statistics.subscriberCount);
        setComment(jconmment.items);
    }
    const getRelate = async()=>{
        if(vidId){
            const jrelate = await(await fetch(`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${vidId.id}&type=video&maxResults=50&part=snippet&key=${API_KEY}`)).json();
            setRelateVideo(jrelate.items);
            setShow(true);
        }
    }

    useEffect(()=>{
        getItem();
        setTimeout(getRelate,1000);
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

    return(
        <div>
            <Header/>
            <div className={styles.box}>
                <div className={styles.container}>
                    <div className={styles.video}>
                        <div className={styles.thumbnail}>
                            <img src={json.snippet.thumbnails.high.url}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.videotitle}>
                                <div className={styles.titleinfo}>
                                    <div className={styles.tag}>
                                        #tag
                                    </div>
                                    <div className={styles.title}>
                                        {json.snippet.title}
                                    </div>
                                    <div className={styles.viewoption}>
                                        <div className={styles.viewinfo}>
                                            조회수 {view(json.statistics.viewCount)}회 · {(json.snippet.publishedAt).slice(0,10)}.
                                        </div>
                                        <div className={styles.options}>
                                            <div>
                                                ☜{likes (json.statistics.likeCount)}
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
                                        <img src='https://w7.pngwing.com/pngs/110/230/png-transparent-whatsapp-application-software-message-icon-whatsapp-logo-whats-app-logo-logo-grass-mobile-phones-thumbnail.png'/>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.channeltitle}>
                                        {json.snippet.channelTitle}
                                    </div>
                                    <div className={styles.subs}>
                                        구독자 {likes(item)}
                                    </div>
                                    <div className={styles.description}>
                                        {json.snippet.description}
                                    </div>
                                </div>
                                <div>
                                    <button className={styles.subbutton}>구독</button>
                                </div>
                            </div>
                            <div className={styles.comment}>
                                <div className={styles.commenttop}>
                                    <div className={styles.commentcount}>
                                        댓글 {view(json.statistics.commentCount)}개
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
                                {comment.map((comments)=>(
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
                        </div>
                    </div>
                    {
                        show ? (
                        <div className={styles.videolist}>
                            {relatevideo.filter(relate => relate.snippet !== undefined).map((relate)=>(
                                    <div className={styles.relateV}>
                                        <div className={styles.relatethumb}>
                                            <img src={relate.snippet.thumbnails.high.url}/>
                                        </div>
                                        <div className={styles.relateinfo}>
                                            <div className={styles.relatetitle}>
                                                {(relate.snippet.title).length>40 ? `${(relatevideo[1].snippet.title).slice(0,35)}...` : (relate.snippet.title)}
                                            </div>
                                            <div>
                                                {relate.snippet.channelTitle}
                                            </div>
                                            <div>
                                                <div>
                                                    조회수 2.5만회 ·  <Moment fromNow>{relate.snippet.publishedAt}</Moment>
                                                </div>
                                            </div>
                                        </div>
                                    </div>            
                            ))}
                        </div>
                        ) : (
                            <div className={styles.videolist}>
                                <div className={styles.loading}>L</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowVideo;