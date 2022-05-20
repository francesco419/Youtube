import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as YoutubeB } from './img/YouTube-Logo.wine.svg';
import { ReactComponent as YoutubeW } from './img/YouTube-White-Full-Color-Logo.wine.svg';
import { ReactComponent as Make } from './img/make.svg';
import { ReactComponent as SearchIcon } from './img/searchicon.svg';
import { ReactComponent as Sound } from './img/sound.svg';
import { ReactComponent as AppIcon } from './img/app.svg';
import { ReactComponent as Event } from './img/event.svg';


function Header(){
    return(
        <div className={styles.header}>
                <div className={styles.back}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <button className={styles.menubutton}>
                            <FontAwesomeIcon icon={faBars} size="lg" style={{color:'white'}}/>
                            <div className={styles.menueffect}></div>
                        </button>
                        <Link to={`${process.env.PUBLIC_URL}/`}>
                            <YoutubeW className={styles.youtube}/>
                        </Link>
                    </div>
                    <div className={styles.searchmenu}>
                        <div className={styles.searchboxA}>
                            <div className={styles.searchicon}>
                                <SearchIcon style={{width:'15px',height:'15px',color:'white'}}/>
                            </div>
                                <input className={styles.search} placeholder='검색' type='text'/>
                                <button type='submit' className={styles.searchbutton}>
                                    <SearchIcon style={{width:'20px',height:'20px',color:'white'}}/>
                                </button>
                        </div>
                        <div className={styles.sound}>
                            <Sound style={{width:'24px',height:'24px',color:'white'}}/>
                        </div>
                    </div>
                    <div className={styles.profilemenu}>
                        <Make style={{width:'24px',height:'24px',color:'white'}} className={styles.make}/>
                        <AppIcon style={{width:'24px',height:'24px',color:'white'}} className={styles.make}/>
                        <Event style={{width:'24px',height:'24px',color:'white'}} className={styles.make}/>
                        <div className={styles.profile}>
                            F
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Header;