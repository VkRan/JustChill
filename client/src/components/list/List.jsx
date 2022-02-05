import "./list.scss";
import React, { useEffect, useRef, useState} from 'react';
import {ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import ListItem from "../listitem/ListItem";

const List = (props) => {
    const [slideNum,setSldieNum]= useState(0);
    const [count, setCount] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth/230);
    const listref = useRef();

    useEffect(()=>{
        setCount(props.list.content.length);
    },[props.list.content])

    const handleClick = (direction) => {
        let dis = listref.current.getBoundingClientRect().x-50;
        if(direction==="left"&&slideNum>0){
            setSldieNum(slideNum-1);
            listref.current.style.transform=`translateX(${230+dis}px)`
        }
        else if(direction==="right"&&slideNum<count-clickLimit){
            setSldieNum(slideNum+1);
            listref.current.style.transform=`translateX(${-230+dis}px)`
        }
    }
    return (
        <div className="list">
            <span className="listTitle">{props.list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left" 
                    onClick={()=>handleClick("left")} 
                />
                <div className="container" ref={listref}>
                    {
                        props.list.content.map((id,i)=>(
                            <ListItem id={id} ind={i} key={i}/>
                        ))
                    }
                    {/* <ListItem id={props.list.content[0]} ind={4} key={4}/>
                    <ListItem id={props.list.content[0]} ind={5} key={5}/>
                    <ListItem id={props.list.content[0]} ind={6} key={6}/>
                    <ListItem id={props.list.content[0]} ind={4} key={4}/>
                    <ListItem id={props.list.content[0]} ind={5} key={5}/>
                    <ListItem id={props.list.content[0]} ind={6} key={6}/> */}
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>handleClick("right")} />
            </div>
        </div>
    )
}

export default List
