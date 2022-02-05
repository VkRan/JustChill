import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import "./featured.scss";
import axios from 'axios';

const Featured = (props) => {
    const [random, setRandom] = useState(null);
    useEffect(()=>{
        const getRandom = async () => {
            try {
                const response = await axios.get(`movie/random${props.type ? '?type=' + props.type : ''}`);
                setRandom(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        } 
        getRandom();
    },[props.type] )
    return (
        <div className="featured">
            {props.type&&(
                <div className="category">
                    <span>{props.type==="series"?"Series Genre":"Movie Genre"}</span>
                    <select name="genre" id="genre" onChange={(e)=>props.setGenre(e.target.value)}>
                        <option value="genre">All</option>
                        <option value="thriller">Thriller</option>
                        <option value="action">Action</option>
                        <option value="fiction">Fiction</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                    </select> 
                </div>
            )}
            <img width="100%" src={random?random.image:""} alt="" />
            <div className="info">
                <img src="https://occ-0-2590-2186.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABRKrgH8goki6B50_fsipiwG8-efCu0w57iY4KsMiMOkV_xpwmCR1bwdO-qexN7jGsMEEVHu_udqNGVab2eGM-RxjYidvNBjuWkAE.png?r=df1" alt="" />
                <span className="desc">
                    {random?random.description:""}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>     
            </div>
        </div>
    )
}

export default Featured
