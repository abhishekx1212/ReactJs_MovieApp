import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "039b164044f76aafad8ac461dc301349", // Set the API key as default params
    },
})

export default apiInstance;