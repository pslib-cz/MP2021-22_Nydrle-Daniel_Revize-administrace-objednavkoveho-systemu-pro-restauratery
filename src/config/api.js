import axios from "axios";

export const api = axios.create({baseURL: "https://next.mealgo.cz/data"});