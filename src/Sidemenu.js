import { ReactComponent as HomeQ } from './home.svg';
import { ReactComponent as SearchQ } from './searchY.svg';
import { ReactComponent as ShortsQ } from './shorts.svg';
import { ReactComponent as SubscQ } from './subscribe.svg';
import { ReactComponent as OriginQ } from './originals.svg';
import { ReactComponent as MusicQ } from './music.svg';
import { ReactComponent as StoreQ } from './store.svg';
import { ReactComponent as SaveQ } from './save.svg';
import { ReactComponent as HistoryQ } from './history.svg';
import { ReactComponent as MyvideoQ } from './myvideo.svg';
import { ReactComponent as LastervideoQ } from './latervideo.svg';
import { ReactComponent as LikeQ } from './like.svg';
import { ReactComponent as MovieQ } from './movie.svg';
import { ReactComponent as GameQ } from './game.svg';
import { ReactComponent as LivestreamQ } from './livestream.svg';
import { ReactComponent as EduQ } from './edu.svg';
import { ReactComponent as SportsQ } from './sports.svg';
import { ReactComponent as SettingQ } from './setting.svg';
import { ReactComponent as SingoQ } from './singo.svg';
import { ReactComponent as CustomersQ } from './customers.svg';
import { ReactComponent as SuggestionQ } from './suggestion.svg';
import styles from "./Sidemenu.module.css";
import {Link} from "react-router-dom";

function Sidemenu({json}){
    const data = json;
    const aa = 'aaa';
    return(
        <div className={styles.sidemenu1}>
            <div className={styles.part}>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <HomeQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>홈</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <Link className={styles.inner} to="/Search" state={json}>
                            <SearchQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>탐색</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <ShortsQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>Shorts</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <SubscQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>구독</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <OriginQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>Originals</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <MusicQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>YouTube Music</span>
                        </div>
                    </div>
                </div>
                <div className={styles.part2}>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <StoreQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>보관함</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <HistoryQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>시청 기록</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <MyvideoQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>내 동영상</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <LastervideoQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>나중에 볼 동영상</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <SaveQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>오프라인 저장 동영상</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>         
                                <LikeQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>좋아요 표시한 동영상</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.home}>
                        <div className={styles.setting}>
                            <div className={styles.inner}>
                                <LikeQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                                <span>더보기</span>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={styles.set}>
                <div className={styles.nohover}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <span>구독</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <LikeQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>채널 탐색</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.set}>
                <div className={styles.nohover}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <span>YOUTUBE 더보기</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <MovieQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>영화</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <GameQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>개임</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <LivestreamQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>실시간</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <EduQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>학습</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <SportsQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>스포츠</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.set}>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <SettingQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>설정</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <SingoQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>신고 기록</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <CustomersQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>고객센터</span>
                        </div>
                    </div>
                </div>
                <div className={styles.home}>
                    <div className={styles.setting}>
                        <div className={styles.inner}>
                            <SuggestionQ className={styles.homeq} style={{width:'24px',height:'24px',color:'white'}}/>
                            <span>의견 보내기</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidemenu;