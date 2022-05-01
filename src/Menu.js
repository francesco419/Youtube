import {useState,useEffect} from 'react';
import styles from "./Menu.module.css";
import Sidemenu from './Sidemenu';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as YoutubeB } from './YouTube-Logo.wine.svg';
import { ReactComponent as YoutubeW } from './YouTube-White-Full-Color-Logo.wine.svg';
import { ReactComponent as Make } from './make.svg';
import { ReactComponent as SearchIcon } from './searchicon.svg';
import { ReactComponent as Sound } from './sound.svg';
import { ReactComponent as AppIcon } from './app.svg';
import { ReactComponent as Event } from './event.svg';

function Menu({json}){
    return(
        <div>
            <div className={styles.header}>
                <div className={styles.back}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <FontAwesomeIcon icon={faBars} size="lg" style={{color:'white'}}/>
                        <YoutubeW className={styles.youtube}/>
                    </div>
                    <div className={styles.searchmenu}>
                        <div className={styles.searchboxA}>
                            <div className={styles.searchicon}>
                            <SearchIcon style={{width:'15px',height:'15px',color:'white'}}/>
                            </div>
                            <input className={styles.search} placeholder='검색' type='text'/>
                            <div className={styles.searchbutton}>
                                <SearchIcon style={{width:'20px',height:'20px',color:'white'}}/>
                            </div>
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
            <div className={styles.sidemenu}>
                <Sidemenu
                json={json}
                />
            </div>
        </div>
    )  
}

export default Menu;