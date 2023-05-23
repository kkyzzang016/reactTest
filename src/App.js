import { useState, useEffect } from "react";
import axios from 'axios'
import "./res/index.css";
import moment from "moment";
import { Link, Route, Routes } from "react-router-dom";
import Detail from "./pages/detail";

const USER_NO = 'ME00001'

function App() {

  const [userName, setUserName] = useState('');
  const [pType, setPtype] = useState(1);
  const [count, setCount] = useState(0);
  const [minute, setMinute] = useState(0);
  const [meter, setMeter] = useState(0);
  const [reduction, setReduction] = useState(0);

  const [payList, setPayList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const [test, setTest] = useState(false);

  const getUserName = () => {
    axios.get(`http://localhost:8080/api/v1/user/${USER_NO}`)
      .then(response => {
        setUserName(response.data?.name)
      })
  }

  const getUsedData = async () => {
    axios.get(`http://localhost:8080/api/v1/user/${USER_NO}/usage/summary?ptype=${pType}`)
      .then(response => {
        setCount(response?.data?.usage_count);
        setMinute(response?.data?.usage_minute);
        setMeter(response?.data?.usage_meter);
        setReduction(response?.data?.carbon_reduction);
      })   
  }

  const getUsedListData = async () => {
    axios.get(`http://localhost:8080/api/v1/user/${USER_NO}/usage?ptype=${pType}`)
      .then(response => {
        if(response?.data?.length > 0){
          setPayList(response?.data);
          setIsEmpty(false);
        }else{
          setIsEmpty(true);
        }
      })   
  }

  const formatter = (meter) => {
    return (meter-(meter%100))/1000;
  }

  const trigger = () => {
    setIsEmpty(!isEmpty);
  }

  const payAmt = (card, point) => {

    card = amtFormatter(card);
    point = amtFormatter(point);

    if(card === 0 && point !== 0){
      return `포인트 ${point}원`
    }else if(card !== 0 && point === 0){
      return `카드 ${card}원`
    }else if(card !== 0 && point !== 0){
      return `카드 ${card}원 + 포인트 ${point}원`
    }
  }

  const amtFormatter = (amt) => {
    const nFormat = new Intl.NumberFormat();
    return nFormat.format(amt);
  }
  
  useEffect(()=>{
    getUserName()
  },[])

  useEffect(() => {
    getUsedData();
    getUsedListData();
  }, [pType])

  return (
    <div>
      <div className="main-title">
        <h1>서비스 이용내역</h1>
        <div>{userName}</div>
      </div>
      <hr />

      <div className="service-summary">
        <div className="service-summary-tab">
          <button className={`tablinks ${pType === 1 && "on" }`} onClick={() => setPtype(1)}>1주일</button>
          <button className={`tablinks ${pType === 2 && "on" }`} onClick={() => setPtype(2)}>1개월</button>
          <button className={`tablinks ${pType === 3 && "on" }`} onClick={() => setPtype(3)}>3개월</button>
        </div>
        <div className="spacer-20"></div>
        <div className="service-summary-detail-container">
          <div className="color-gray">이용건수</div>
          <div>{count}건</div>
          <div className="color-gray">이용시간</div>
          <div>{minute}분</div>
          <div className="color-gray">이동거리</div>
          <div>{formatter(meter)}km</div>
          <div className="color-gray">탄소절감효과</div>
          <div>{reduction}kg</div>
          <div></div>
          <div><button className="tablinks on" onClick={() => trigger()}>까꿍</button></div>
        </div>

        <div className="kwangyong">
        <div>이용건수</div>
          <div>{count}건</div>
          <div>{count}건</div>
        </div>
        <div className="kwangyong">
        <div>이용시간</div>
          <div>{minute}분</div>
          <div>{minute}분</div>
        </div>
      </div>

      <hr />

      <div className="service-list-container">


        {!isEmpty && payList.map((item, index) => {
          return <div className="service-list-content" key={`service_${index}`}>
            <Link to={"/detail"} state={{payList: payList}}>
              <div className="service-list-header">
                <span>{formatter(item.use_distance)}km</span>
                <span className="color-gray ml-10">{item.use_time}분</span>
              </div>
            </Link>
            <div className="service-list-body">
              <div className="color-gray">이용시간</div>
              <div>{item.use_start_dt} ~ {item.use_end_dt}</div>
              <div className="color-gray">결제일시</div>
              <div>{item.pay_datetime}</div>
              <div className="color-gray">결제수단</div>
              <div>{payAmt(item.card_pay, item.point_pay)} </div>
            </div>
            <hr />
          </div>
        })}
      </div>

      {isEmpty && 
        <div className="service-empty">
          <div className="service-empty-container">
            <div className="service-empty-message">
              조회된 정보가 없습니다.
            </div>
          </div>
        </div>
      }

      <button onClick={() => setTest(true)}>props 테스트</button>

      {test && <Detail name={userName} />}

    </div>
  );
}

export default App;
