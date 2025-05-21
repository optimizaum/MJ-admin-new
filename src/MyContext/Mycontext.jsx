import axios from "axios";
import { createContext, useState } from "react";
import React from "react";

export const MyContext = createContext();
const MyContextProvider = (props) => {
    const [postData, setPostData] = useState(false);
    const [profile, setProfile] = useState([]);
    const [userData, setUserData] = useState(false);
    const [userSingleData, setUserSingleData] = useState([]);
    const [updatePostData, setupdatePostData] = useState([]);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // -------------display all post data--------------
    const getPostData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/allSource`, {
            });
            console.log("response-------------", response);
            setPostData(response?.data?.dataAllSource);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    // ---------------get single post data----------------
    const getSingleData = async (_id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/source/${_id}`);
            console.log("singleResponse-------------", response);

            const sourceData = response?.data?.sourceData;
            const formDetails = response?.data?.formData;

            setUserSingleData({
                sourceData,
                formData: formDetails
            });

        } catch (error) {
            console.error('Error', error);
        }
    };
    // ----------------get all user data-------------------
    const getUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/allUser`, {
            });
            console.log("response-------------", response);
            setUserData(response?.data?.allUserData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    //  ---------------------put api for edit data----------------

    const putPostData = async (_id, data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('postType', data.postType);
            if (data.file) {
                formData.append('file', data.file);
            }

            const response = await axios.put(`${API_BASE_URL}/sources/${_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setupdatePostData(response?.data?.sourceData);
            console.log("update----form----", response);
        } catch (err) {
            console.log("error", err);
        }
    };

    // get profile---------------
    const getProfile = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/get-setting`, {
            });
            // console.log("profile response-------------", response);
            setProfile(response?.data);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    // ---------get answer----------------
    const [answerData, setAnswerData] = useState([]);

    const fetchAnswer = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/answer`, {
            });
            console.log("response- answer------------", response.data.data);
            setAnswerData(response?.data?.data);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    // ==========
    const [answerId, setnswerId] = useState([]);
    // const setAnswerId = (id) => {
        
    // }

    const value = {
        postData,
        getPostData,
        userSingleData,
        getSingleData,
        userData,
        getUserData,
        updatePostData,
        putPostData,
        profile,
        getProfile,
        answerData,
        fetchAnswer,
        API_BASE_URL,
        answerId,
        setnswerId
    };

    return (
        <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
    );
};

export default MyContextProvider;
