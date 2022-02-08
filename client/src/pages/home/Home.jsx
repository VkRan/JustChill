import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from 'axios';

const Home = (props) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState("");

    useEffect(() => {
        const randomList = async () => {
            try {
                if (genre === "genre")
                    setGenre("");
                const response = await axios.get(`http://localhost:5000/api/list${props.type ? '?type=' + props.type : ''}${props.type && genre ? '&genre=' + genre : ''}`, { withCredentials: true });
                setLists(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        randomList();
    }, [props.type, genre])
    return (
        <div className="home">
            <Navbar />
            <Featured type={props.type} setGenre={setGenre} />
            {lists.map((list) => (
                <List list={list} key={list._id} />
            ))}
        </div>
    )
}

export default Home
