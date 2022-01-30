import "./list.scss";
import React, { useRef, useState} from 'react';
import {ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import ListItem from "../listitem/ListItem";

const List = (props) => {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNum,setSldieNum]= useState(0);
    const listref = useRef();

    const handleClick = (direction) => {
        let dis = listref.current.getBoundingClientRect().x-50;
        if(direction==="left"&&slideNum>0){
            setSldieNum(slideNum-1);
            if(slideNum===0){
                setIsMoved(false);
            }
            listref.current.style.transform=`translateX(${230+dis}px)`
        }
        else if(direction==="right"&&slideNum<3){
            setSldieNum(slideNum+1);
            if(slideNum!=0){
                setIsMoved(true);
            }
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
                    style={{display:!isMoved&&"none"}}
                />
                <div className="container" ref={listref}>
                    {
                        props.list.content.map((id,i)=>(
                            <ListItem id={id} ind={i} key={i}/>
                        ))
                    }
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>handleClick("right")} />
            </div>
        </div>
    )
}

export default List
