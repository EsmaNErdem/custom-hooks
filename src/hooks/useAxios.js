import { useState, useEffect } from "react";
import axios from "axios";
import { formatterPlaying, formatterPokemon } from "../helpers";

const useAxios = (key, url) => {
    const [state, setState] = useLocalStorage(key)

    const addResponseData = async (urlSuffix = "") => {
        const response = await axios.get(`${url}${urlSuffix}`);
        const resData = key === "playingCards" ? formatterPlaying(response.data) : formatterPokemon(response.data)
        setState((data) => [...data, resData]);
    };

    const clearState = () => {
        setState([])
    }

    return [state, addResponseData, clearState]
}

const useLocalStorage = (key, initialvalue = []) => {
    if(localStorage.getItem(key)) {
        try {
            initialvalue =  JSON.parse(localStorage.getItem(key))
        } catch (e) {
            console.log(e)
        }
    }
    const [value, setValue] = useState(initialvalue)

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
      }, [key, value])
    
    return [value, setValue]
}

export default useAxios;
