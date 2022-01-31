import { ArrowBackOutlined } from '@mui/icons-material';
import React from 'react';
import {useLocation, Link} from 'react-router-dom'
import "./watch.scss";

const Watch = () => {
    const loc = useLocation();
    const movie = loc.movie;
    
    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            
            <video className="video" 
                   autoPlay progress controls 
                   src="https://storage.coverr.co/videos/VXVg5TpjGFCqzd2LYznlSMj5sP61kKuB?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjQzNTY5Mzk4fQ.JA1uXxy5T0EijDm90d9ixsBjRW1P3DtVUB0CfmQ5lCQ" />
        </div>
    )
}

export default Watch
