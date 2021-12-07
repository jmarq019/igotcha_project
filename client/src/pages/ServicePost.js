import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import {QUERY_FINDSERVICE} from '../utils/queries';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import "./ServicePost.css"

import { FormattedMessage } from 'react-intl';

// const ServicePost = (socket, userS) =>{
const ServicePost = ({socket}) =>{
    // const [socket, setSocket] = useState(null);
    const { location, type } = useParams();
    const [service, setService] = useState({location: '', description: '', type: '', hourly_rate: '', user: {first_name: '', last_name: ''}})
    const { loading, data, error } = useQuery(QUERY_FINDSERVICE, {
        fetchPolicy: "no-cache",
        variables: {
            type: type,
            location: location,
        }
    });

    useEffect(() => {
        console.log('params: ', location, type)
        if (!loading && data && data.findServicePost) {
            setService(data.findServicePost[0])
        }
    }, [data])
    console.log('data: ', data);
    console.log('service: ', service);

    //socket.io
    // const [message, setMessage] = useState(false);
    const [hireService, setHireService] = useState(false);
    const handleNotification = async (event) => {
        event.preventDefault();
        setHireService(true);
        socket.emit("requestEvent", {
            token: localStorage.getItem("id_token"),
            email: service.user.email,
            username: service.user.username,
            //here i can add more like service name
        });
    }

    // const handleNotification = async (type) => {
    //     // event.preventDefault();
    //     setHireService(true);
    //     socket?.emit("sendNotification", {
    //         senderName: userS,    //senderName: user's username
    //         receiverName: service.user.first_name,
    //         type
    //     })
    // };


    return(
        <main className="base-grid home-columns">
            <section className="edit full-width">
                <form className="editprof fit stack" style={{margin:"auto", maxWidth:"70%"}}>
                    <h1 className="simple-header" style={{color:"white"}}>{service.type} </h1>
                    <div className="empw">
                    
                        <h6><FormattedMessage id="by"/>: {service.user.first_name} {service.user.last_name}</h6>
                        <img id="profpic" className="center" alt="Profile Picture" src={service.image} style={{ maxHeight: '150px', margins:"0, auto" }} />
                        <p><FormattedMessage id="location"/>: {service.location}</p>
                        <p><FormattedMessage id="description"/>: {service.description}</p>
                        <p><FormattedMessage id="hourlyRate"/>: {service.hourly_rate}</p>
                    </div>
                    <button
                        className="editprof-btn"
                        style={{color:"white", fontSize:"larger"}}
                        onClick={handleNotification}
                        >
                        <FormattedMessage id="hireService"/>! 
                    </button>
                    {/* <button 
                        className="editprof-btn"
                        // onClick={()=>handleNotification(2)}
                        >
                        Send a message 
                    </button> */}
                </form>
            </section>
        </main>
    );
}
export default ServicePost;