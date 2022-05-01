import styles from "./Videos.module.css";
import Moment from 'react-moment';
import 'moment/locale/ko';
import { useEffect, useState } from "react";


function Videos({thmbnails_high,channelId,title,channelTitle,publishedAt,id,viewCount,description,format,length}){
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
        <div className={styles.videobox}>
            {format ? (
                <div className={styles.video}>
                    <div className={styles.thumbnails}>
                        <img src={thmbnails_high}/>
                        <div>
                            <div className={styles.length}>
                                AAA
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <img src='https://w7.pngwing.com/pngs/110/230/png-transparent-whatsapp-application-software-message-icon-whatsapp-logo-whats-app-logo-logo-grass-mobile-phones-thumbnail.png'/>
                        <div className={styles.title}>
                            <div className={styles.name} title={title}>
                                {title.length>50 ? `${(title).slice(0,47)}...` : title}
                                </div>
                            <a className={styles.channel}>
                                {channelTitle}
                                </a>
                            <div className={styles.view}>
                                {view(viewCount)} · <Moment fromNow>{publishedAt}</Moment>
                            </div>
                        </div>
                        <div className={styles.option}>
                            <button className={styles.op}></button>
                        </div>
                    </div>
                </div>
            ):(
                <div className={styles.false}>
                    <div className={styles.thumbnails}>
                        <img src={thmbnails_high}/>
                    </div>
                    <div className={styles.infof}>
                        <div className={styles.titlef}>
                            <div className={styles.name} title={title}>
                                {title.length>50 ? `${(title).slice(0,47)}...` : title}
                                </div>
                            <div className={styles.viewf}>
                                <a className={styles.channelf}>
                                    {channelTitle}
                                </a>
                                 · {view(viewCount)} · <Moment fromNow>{publishedAt}</Moment>
                            </div>
                            <div className={styles.view}>
                                {description.length>150 ? `${(description).slice(0,148)}...` : description}
                            </div>
                        </div>
                        <div className={styles.option}>
                            <button className={styles.op}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Videos;