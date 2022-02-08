import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import "./featured.scss";
import axios from 'axios';

const Featured = (props) => {
    const [random, setRandom] = useState({});
    useEffect(() => {
        const getRandom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movie/random${props.type ? '?type=' + props.type : ''}`, { withCredentials: true });
                setRandom(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getRandom();
    }, [props.type])
    return (
        <div className="featured">
            {props.type && (
                <div className="category">
                    <span>{props.type === "series" ? "Series Genre" : "Movie Genre"}</span>
                    <select name="genre" id="genre" onChange={(e) => props.setGenre(e.target.value)}>
                        <option value="genre">All</option>
                        <option value="thriller">Thriller</option>
                        <option value="action">Action</option>
                        <option value="fiction">Fiction</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                    </select>
                </div>
            )}
            <img width="100%" src={random.image ? random.image : ""} alt="" />
            <div className="info">
                {random.imageTitle ? <img src={random.imageTitle} alt="" /> : ''}
                <span className="desc">
                    {random.description ? random.description : ""}
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
