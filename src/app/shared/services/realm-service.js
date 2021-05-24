import axios from "axios"

const fetchAllRealms = () => {
    return axios.get('https://blizzapikete.herokuapp.com/data/wow/realm/index');
}

export {
    fetchAllRealms
}