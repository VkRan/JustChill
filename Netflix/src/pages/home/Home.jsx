import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from 'axios';

const Home = (props) => {
    const[lists,setLists]=useState([]);

    useEffect(() => {
        const randomList = async () => {
            try {
                const response = await axios.get(`list${props.type ? '?type=' + props.type : ''}${props.genre ? '&genre=' + props.genre : ''}`);
                setLists(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        randomList();
    }, [props.type, props.genre])
    return (
        <div className="home">
            <Navbar />
            <Featured type={props.type} />
            {lists.map((list)=>(
                <List list={list} key={list._id}/>
            ))}
        </div>
    )
}

export default Home
