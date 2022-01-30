import { Add, MovieCreation, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import "./listItem.scss";
import axios from 'axios';

const ListItem = (props) => {

    const[movie,setMovie]=useState(null);

    useEffect(() => {
        const getMovie = async () => {
            
            try {
                const response = await axios.get(`movie/find/${props.id}`);
                
                setMovie(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMovie();
    }, [props.id])
    const [isHovered,setIsHovered]=useState(false);
    const trailer = "https://storage.coverr.co/videos/VXVg5TpjGFCqzd2LYznlSMj5sP61kKuB?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjQzNTY5Mzk4fQ.JA1uXxy5T0EijDm90d9ixsBjRW1P3DtVUB0CfmQ5lCQ"

    return (
        <Link to={{pathname:"/watch",movie:movie}}>
            <div className="listItem"
                onMouseEnter={()=>setIsHovered(true)}
                style={{left: isHovered && props.ind*230-50}}
                onMouseLeave={()=>setIsHovered(false)}
            >
                <img src= {movie?movie.image:""}
                    alt="" />
                {isHovered&&(
                <>
                    <video src={trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>1 hour 14 mins</span>
                            <span className="limit">+16</span>
                            <span>1999</span>
                        </div>
                        <div className="desc">
                            {movie?movie.description:"Loading..."}
                        </div>
                        <div className="genre">{movie?movie.genre:"Loading..."}</div>
                    </div>
                </>
                )}
            </div>
        </Link>
        
    )
}

export default ListItem;
