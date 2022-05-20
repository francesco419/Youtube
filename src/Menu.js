import {useState,useEffect} from 'react';
import styles from "./Menu.module.css";
import Sidemenu from './Sidemenu';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as YoutubeB } from './img/YouTube-Logo.wine.svg';
import { ReactComponent as YoutubeW } from './img/YouTube-White-Full-Color-Logo.wine.svg';
import { ReactComponent as Make } from './img/make.svg';
import { ReactComponent as SearchIcon } from './img/searchicon.svg';
import { ReactComponent as Sound } from './img/sound.svg';
import { ReactComponent as AppIcon } from './img/app.svg';
import { ReactComponent as Event } from './img/event.svg';
import { Link, useNavigate } from 'react-router-dom';

function Menu({json,getData,ishide}){
    const [hide,setHide]=useState(ishide ? ishide : false),
    [search,setSerch]=useState(null);
    let navigate = useNavigate();

    const HideMenu = ()=>{
        if(hide){
            setHide(false);
            getData(false);
            console.log('hide to false');
        }else{
            setHide(true);
            getData(true);
            console.log('hide to true');
        }
    }

    const onSearch=(e)=>{
        if(search===null || search===' '){
            return;
        }else{
            navigate(`/SearchVideo/${search}`);
        }
    }

    const onChanges=(e)=>{
        setSerch(e.target.value);
    }

    return(
        <div>
            <div className={styles.header}>
                <div className={styles.back}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <button onClick={HideMenu} className={styles.menubutton}>
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
                            <form onSubmit={e=> onSearch(e)} className={styles.submitform}>
                                <input className={styles.search} placeholder='검색' type='text' onChange={onChanges}/>
                                <button type='submit' className={styles.searchbutton}>
                                    <SearchIcon style={{width:'20px',height:'20px',color:'white'}}/>
                                </button>
                            </form>
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
            <Sidemenu json={json} hide={hide}/>
        </div>
    )  
}

export default Menu;