import styles from "./Search.module.css";
import Menu from "./Menu";
import { useLocation } from 'react-router-dom';
import Videos from "./Videos";

function Search(){
    let location = useLocation();
    const json = location.state;
    const icon=[
        {
            url:"//youtube.com/img/explore/destinations/icons/trending_color_32.png",
            name:"인기"
        },
        {
            url:"//youtube.com/img/explore/destinations/icons/music_color_32.png",
            name:"음악"
        },
        {
            url:"//youtube.com/img/explore/destinations/icons/movies_color_32.png",
            name:"영화"
        },
        {
            url:"//youtube.com/img/explore/destinations/icons/gaming_color_32.png",
            name:"게임"
        },
        {
            url:"//youtube.com/img/explore/destinations/icons/sports_color_32.png",
            name:"스포츠"
        },
        {
            url:"//youtube.com/img/explore/destinations/icons/learning_color_32_v1.png",
            name:"학습"
        }]
    console.log(json)
    return(
    <div className={styles.page}>
        <Menu/>
        <div className={styles.box}>
            <div className={styles.container}>
                <div className={styles.category}>
                    {icon.map((item)=>(
                        <div className={styles.trending}>
                            <div className={styles.content}>
                                <img id="img" alt="" height="32" width="32" src={item.url}/>
                                <div>{item.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.videopart}>
                    <div className={styles.name}>
                        인기 급상승 동영상
                    </div>
                    <div className={styles.video}>
                    {json.map((item)=>(
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
                        format={false}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Search;