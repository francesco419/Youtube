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
