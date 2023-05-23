import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import App from "../App";
// import style from '../css/style.module.css';

export default function Detail(props){
    // link로 state 넘겨받을 때
    const data = useLocation();

    const time = data?.state?.payList[0]?.use_time;

    // props에서 받은거 미리 선언해도됨
    const userName = props?.name;

    useEffect(() => {
        console.log("state", data.state)
    }, [data])
    

    useEffect(() => {
        console.log("props", props)
    }, [props])


    return(
    <>
        {/* <span className={style.layout}>test</span> */}
        <Link to={"/"}>
        디테일 화면입니다. {userName}
        </Link>
        {time}
    </>);
 
}

// const Detail = () => {

    
// }

// export default Detail;