import { ReactComponent as HomeQ } from './img/home.svg';
import { ReactComponent as SearchQ } from './img/searchY.svg';
import { ReactComponent as ShortsQ } from './img/shorts.svg';
import { ReactComponent as SubscQ } from './img/subscribe.svg';
import { ReactComponent as OriginQ } from './img/originals.svg';
import { ReactComponent as MusicQ } from './img/music.svg';
import { ReactComponent as StoreQ } from './img/store.svg';
import { ReactComponent as SaveQ } from './img/save.svg';
import { ReactComponent as HistoryQ } from './img/history.svg';
import { ReactComponent as MyvideoQ } from './img/myvideo.svg';
import { ReactComponent as LastervideoQ } from './img/latervideo.svg';
import { ReactComponent as LikeQ } from './img/like.svg';
import { ReactComponent as MovieQ } from './img/movie.svg';
import { ReactComponent as GameQ } from './img/game.svg';
import { ReactComponent as LivestreamQ } from './img/livestream.svg';
import { ReactComponent as EduQ } from './img/edu.svg';
import { ReactComponent as SportsQ } from './img/sports.svg';
import { ReactComponent as SettingQ } from './img/setting.svg';
import { ReactComponent as SingoQ } from './img/singo.svg';
import { ReactComponent as CustomersQ } from './img/customers.svg';
import { ReactComponent as SuggestionQ } from './img/suggestion.svg';
import styles from "./Sidemenu.module.css";
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from 'react';

function Sidemenu({json,hide}){
    const SVGcomponent = [
    {
        name:'Home',
        data:<HomeQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Search',
        data: <SearchQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Shorts',
        data:<ShortsQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Subsc',
        data:<SubscQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Origin',
        data:<OriginQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Music',
        data:<MusicQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Store',
        data:<StoreQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'Save',
        data:<SaveQ className={hide ? styles.smallbarD : styles.homeq}/>,
    },
    {
        name:'History',
        data:<HistoryQ className={styles.homeq}/>,
    },
    {
        name:'Myvideo',
        data:<MyvideoQ className={styles.homeq}/>,
    },
    {
        name:'Lastervideo',
        data:<LastervideoQ className={styles.homeq}/>,
    },
    {
        name:'Like',
        data:<LikeQ className={styles.homeq}/>,
    },
    {
        name:'Movie',
        data:<MovieQ className={styles.homeq}/>,
    },
    {
        name:'Game',
        data:<GameQ className={styles.homeq}/>,
    },
    {
        name:'Livestream',
        data:<LivestreamQ className={styles.homeq}/>,
    },
    {
        name:'Edu',
        data:<EduQ className={styles.homeq}/>,
    },
    {
        name:'Sports',
        data:<SportsQ className={styles.homeq}/>,
    },
    {
        name:'Setting',
        data:<SettingQ className={styles.homeq}/>,
    },
    {
        name:'Singo',
        data:<SingoQ className={styles.homeq}/>,
    },
    {
        name:'Customers',
        data:<CustomersQ className={styles.homeq}/>,
    },
    {
        name:'Suggestion',
        data:<SuggestionQ className={styles.homeq}/>,
    }
];

let location = useLocation();

    function Content({props,link,api,text}){
       for(let i=0;i<SVGcomponent.length;i++){
            if(props==SVGcomponent[i].name){
            return(
                hide ? (
                <div className={styles.smallbarA}>
                    <div className={styles.smallbarB}>
                        <div className={styles.smallbarC}>
                            <Link className={styles.smallbarD} to={link} state={api ? api : null}>
                                {SVGcomponent[i].data}
                                <div>{text}</div>
                            </Link>
                        </div>
                    </div>
                </div>
                ):(
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <Link className={styles.inner} to={link} state={api ? api : null}>
                                {SVGcomponent[i].data}
                                <span>{text}</span>
                            </Link>
                        </div>
                    </div>
                </div>
                )
                )
            }
        }
    }

    return(
        <div className={styles.sidemenu1}>
            {hide ? (
                <div className={styles.smallbar}>
                    <Content props='Home' link='/' text='홈'/>
                    <Content props='Search' link='/Search' text='탐색' api={json}/>
                    <Content props='Shorts' link='/Shorts' text='Shorts' api={json}/>
                    <Content props='Subsc' link='/' text='구독'/>
                    <Content props='Origin' link='/Originals' text='Originals'/>
                    <Content props='Music' link='/' text='YouTube Music'/>
                    <Content props='Store' link='/' text='보관함'/>
                    <Content props='Save' link='/' text='오프라인 저장 동영상'/>
                </div>
            ):(
                <div className={styles.part}>
                    <Content props='Home' link='/' text='홈'/>
                    <Content props='Search' link='/Search' text='탐색' api={json}/>
                    <Content props='Shorts' link='/Shorts' text='Shorts' api={json}/>
                    <Content props='Subsc' link='/' text='구독'/>
                    <Content props='Origin' link='/Originals' text='Originals'/>
                    <Content props='Music' link='/' text='YouTube Music'/>
                    <div className={styles.part2}>
                    <Content props='Store' link='/' text='보관함'/>
                    <Content props='History' link='/' text='시청기록'/>
                    <Content props='Myvideo' link='/' text='내 동영상'/>
                    <Content props='Lastervideo' link='/' text='나중에 볼 동영상'/>
                    <Content props='Save' link='/' text='오프라인 저장 동영상'/>
                    <Content props='Like' link='/' text='좋아요 표시한 동영상'/>
                    <Content props='Like' link='/' text='더보기'/>
                </div>
                <div className={styles.set}>
                    <div className={styles.nohover}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <span style={{color: '#aaaaaa'}}>구독</span>
                            </div>
                        </div>
                    </div>
                    <Content props='Like' link='/' text='채널 탐색'/>
                </div>
                <div className={styles.set}>
                    <div className={styles.nohover}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <span style={{color: '#aaaaaa'}}>YOUTUBE 더보기</span>
                            </div>
                        </div>
                    </div>
                    <Content props='Movie' link='/' text='영화'/>
                    <Content props='Game' link='/' text='개임'/>
                    <Content props='Livestream' link='/' text='실시간'/>
                    <Content props='Edu' link='/' text='학습'/>
                    <Content props='Sports' link='/' text='스포츠'/>
                </div>
                <div className={styles.set}>
                    <Content props='Setting' link='/' text='설정'/>
                    <Content props='Singo' link='/' text='신고 기록'/>
                    <Content props='Customers' link='/' text='고객센터'/>
                    <Content props='Suggestion' link='/' text='의견 보내기'/>
                </div>
            </div>
            )}
        </div>
    )
}

export default Sidemenu;