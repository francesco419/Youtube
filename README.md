Youtue API

===1===

API=KEY 숨기기.

- dotenv를 사용하여 API_KEY를 github에서 확인할수 없도로 설정.

- dotenv는 react-create-app을 사용 할 시에 같이포함되어 있기에 따로 설치할 필요가 없다.

momentjs사용

- 유튜브의 올린시간을 계산 및 표시하기위한 라이브러리

===2===

Header 및 Sidemenu 컴포넌트화.

탐색페이지 제작. Header와 Sidemenu를 하나의 컴포넌트인 Menu에 넣음으로서 매번 페이지 제작시에 간단하게 불러올 수 있도록 함.

링크사용시 현재 페이지의 데이터를 state를 사용해 이동할 페이지로 데이터를 보내는 방법을 사용하여 JSON파일을 매번 로드 할 필요가 없도록 설정.

        <Link className={styles.inner} to="/Search" state={json}> </Link>

링크에서 state를 통해 이동할 페이지에 데이터를 보내고

        import { useLocation } from 'react-router-dom';
        let location = useLocation();
        const json = location.state;

과 같은 방법으로 이동된 페이지에서 useLocation을 통하여 받은 state데이터를 사용할 수 있게 된다.

원래 JSON이 필요할 때마다 매번 fetch를 통해 가져올 구성이었으나 불필요한 작업을 최소화 하기 위해 위 방법을 사용하였다.

제작하는 페이지마다 썸네일, 제목 등등의 요소의 배치 방식이 다르므로, 불러오는 페이지에서 매개변수format을 VIdeo파일에 받아 format의 true , false를 통해 어떠한 배치방식을 보여줄지 설정하도록 하였다.

- 2.1

동영상 클릭시 동영상 뷰 페이지인 ShowVideo 페이지 제작

- 2.2

ShowVideo페이지 제작 완료

===3===

채널페이지제작단계

이전에 제작했던 헤더 및 사이드메뉴 컴포넌트 추가.

API를 사용하여 베너이미지, 로고, 채널이름 구독자수 등의 정보를 가져옴.

채널페이지에서 홈, 동영상 재생목록 등 6개의 탭 메뉴 제작.

TabContent컴포넌트를 통해 각 메뉴마다 지정되어있는 tab State를 클릭시 변경 및 랜더링하는 방식으로 탭 페이지가 전환되는것을 유도하였다.

각 카테고리마다 각각의 페이지를 제작할 예정.

- 3.1 홈카테고리

Channel -> ChannelHome -> Playlist -> PlaylistVideo 순서로 메뉴 탭중 '홈'카테고리의 페이지를 제작하였다.

Channel.js에서 채널ID를 Link 컴포넌트 매개변수로 받아와 이를 통해 API를 호출. 채널의 Tralier Video에 대한 ID를 받아 다시 Video API를 사용해 하나의 동영상이 Channel페이지에서 Trailer로서 보여지도록 했다.

채널마다 짧게는 5개 길게는 10개이상의 플레이리스트와 각 플레이리스트의 동영상들이 보여지는 구조를 가지고있어, 각 플레이리스트를 만들어줄 Playlist.js 컴포넌트를 제작하였다.

반복되는 구조가 있는 페이지는 되도록이면 컴포넌트를 만들어 중복되지않고 재사용하는 방식을 사용하였다.

Playlist.js에서도 각 플레이리스트 마다 12개의 영상을 나열하는 방식이므로 각 영상을 제작하는 PlaylistVideo.js 컴포넌트를 제작하였다.

다만 이후 API를 불러오는 과정에서 데이터가 없는 플레이리스트가 로드되거나 혹은 thumbnail없는 (아직 유튜브에 정식으로 등록되지 않거나 다른이유로 인해 제목은 "Private video"가 되고 썸네일 데이터는 전혀 등록되지않은) 영상도 API를 통해 같이 로드되는 방식으로 인해, 이러한 부분을 알지 못한 상황에서 오류를 찾는데에 꽤나 많은 시간이 소요, 문제가 생길 수 있는 데이터들을 거를수 있는 코드를 추가하였다.

데이터가 없는 플레이리스트는, 로드 시 플레이리스트의 동영상 데이터가 저장된 items배열의 길이가 2이상이 되지 않을 경우 state에 데이터를 저장하지 않음으로 ChannelHome페이지에 로드시 오류를 발생시키도록 하지 않도록 설정 하고, 썸네일이 없을 경우에는 삼항연산자를 사용해 다른 이미지를 대체하도록 하였다.

=오류 및 개선점=
(플레이리스트가 없는 채널은 플레이리스트가 안뜨는 상황 발생.) -로딩애니메이션 사용. 이후 로딩애니메이션이 없어지면서 display:none 적용
(간단한 로딩 애니메이션 필요.) -제작완료
(플레이리스트의 width에 따른 버튼추가 및 이동방식 설정 필요.)

- 3.2 동영상 카테고리

이전 3.1에서 제작한 PlaylistVideo 컴포넌트를 사용하여 쉽게 제작.

API = search / channelID 를 통해 채널에 해당하는 모든 영상 로드.

=오류 및 개선점=
플레이리스트 및 ShowVideos페이지에서 나열된 동영상을 클릭시 state로 전달하는 매개변수가 달라지게 되어 API로드에서 오류를 발생. ShowVideos 페이지의 로드실패 및 오류 발생. 매개변수의 데이터에 따라 유연한 코드처리 필요.

- 3.3 재생목록 카테고리

ChannelPlaylist 컴포넌트 제작.

비교적 간단한 작업이라 각 플레이리스트를 보여주는 컨포넌트를 따로제작하지 않고, 페이지내부에 포함제작.

API에서 각 플레이리스트에 존재하는 영상 수에 대한 데이터가 없음.

썸네일 이미지에 (영상 수를 게시하려던)오버레이 및 마우스 hover오버레이 제작.

커뮤니티 및 내러 카테고리는 API로 받을 수 없기에 제작할 수 없음.

정보 탭 제작완료.

===4===

- 4.1

fetch를 통한 API호출을 axios를 사용하여 대채하는 작업중.

#ShowVideo에서 다른 동영상을 라우터의 Link를 사용할시 url은 바뀌지만 랜더링이 다시 일어나지는 않는 상황 발생.

- 4.2

=Sidemenu에서 반복되어 만들어지는 메뉴요소를 함수형 컴포넌트를 사용하여 반복되는 코드의 사용을 줄임.=

        function Content({props,link,api,text}){
       for(let i=0;i<SVGcomponent.length;i++){
            if(props==SVGcomponent[i].name){
            return(
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
            }
        }
    }

메뉴의 모든 요소가 같은 구조를 가지고있기에 SVG컴포넌트를 배열객체를 만들어 name과 data에 각 SVG컴포넌트의 이름과 컴포넌트를 할당

        {
        name:'Suggestion',
        data:<SuggestionQ className={styles.homeq}/>,
    }

    ...

    <Content props='Suggestion' link='/' text='의견 보내기'/>

매개변수로 props(객체이름), link(Link에서의 경로), api(Link를 통해 전달할 state), text(메뉴요소의 이름)를 받아 반복문을 통해 props와 같은 객체이름을 가진 객체를 찾아내어 data를 Link 내부에 할당하고 이를 리턴하는 방식으로 사용하였다.

=상단 버튼클릭시 Sidemenu의 크기변화 및 메인페이지의 크기변화를 적용하기위해 부모-자식 간의 데이터전송을 사용하였다.=

Home.js

        [data,setData]=useState(false);
        const getData=(data)=>{
                setData(data);
                }

        return(
                <Menu
                json={state}
                getData={getData} //props로 getData(함수)를 보내준다.
                />

                ...

                style={data ? {margin:'60px 0 0 72px'} : {margin:'60px 0 0 250px'}}
        )

Menu.js

        function Menu({json,getData}){ //props로 getData(함수)를 받아온다.
        const HideMenu = ()=>{
        if(hide){
            setHide(false);
            getData(false); //데이터셋 : 내부의 setData에 의해 부모 data의 값이 변경.
            console.log('hide to false');
        }else{
            setHide(true);
            getData(true); //데이터셋 : 내부의 setData에 의해 부모 data의 값이 변경.
            console.log('hide to true');
                }
        }

        return(
                ...
         <button onClick={HideMenu}
                ...
         )
        }

- 4.3

페이지를 맨 처음 로드시 안내문인 Info를 띄우도록 설정하고 확인 버튼을 누르면 SessionStorage에 안내문에 대한 표시데이터(boolean)을 저장, 저장된 데이터가 false일시, 페이지를 닫고 다시로드하지 않는 이상, 안내문을 띄우지 않도록 설정하였다.

    [intro,setIntro]=useState(session==true || session===null ? true : false);

    ...

    const setSession=()=>{
        setIntro(false);
        const data = {setting: intro};
        sessionStorage.setItem("setting", JSON.stringify(intro));
    }

    ...

    return(
        ...

        {intro ? (<div className={styles.intro}>
          <div className={styles.inform}>
            <p>{informtext}</p>
            <button onClick={setSession} className={styles.confirm}>확인</button>
          </div>
        </div>): null}

        ...
    )

- 4.4

이전 ShowVideos페이지에서 relatevideo에 대해서 url이 변경되지만 페이지가 로드되지 않는 이슈가 있었다.(line:87)

오류의 원인은 Route설정시

    <Route path="/ShowVideo/:id" element={<ShowVideo/>} />

에서 path의 "/ShowVideo/:id"에서 :id라는 매개변수가 바뀌어도, "/ShowVideo/:id"와 같은 형태를 취하고 있기 때문에 url에 대한 변화를 감지하지 못하고 페이지에서 url만 바뀔뿐 페이지가 로드되지 않았다.

이를 해결하기 위해 useNavigator Hook을 사용하였고,

    const onchange=(url)=>{
        navigate(url); //페이지를 url로 이동
    }

을 Link의 Onclick에 추가시켜 작동되도록 하였으나 이또한 위에서 언급한 이유와 비슷한 이유로인해 페이지가 로드되지 않았다.

페이지가 다시 로드되는 것을 발생시키기위해

    navigate(0); //페이지 새로고침

를 함수의 끝에 추가했고, 이를 통해 의도한대로 작동하는것을 확인 할 수 있었다.

검색창에 검색시 나오는 페이지를 SearchVideo로 제작하였다.

Youtube API에서

    `https://www.googleapis.com/youtube/v3/search?q=${value}&part=snippet&key=${API_KEY}&regionCode=KR`

를 통해 검색할 검색어인 q에 페이지매개변수로 받은 값을 넣어주고 지역은 한국으로 설정한 다음 검색한 API데이터를 호출하여 사용하였다.

페이지에서 보여지는 API 데이터를 이전에 제작한 Videos컴포넌트를 통해 동영상을 노출시켰다.
