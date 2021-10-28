import axios from "axios";
import authHeader from "./auth-header";

const API_URL_PUBLIC = "http://localhost:8080/api/public/deck/";

const getDecks = async () => {
  return axios.get(API_URL_PUBLIC + "all", { headers: authHeader() });
}

const shareDeck = async (deckId) => {
  return axios.get(API_URL_PUBLIC + "share/" + deckId,{ headers: authHeader() })
}

const downloadDeck = async (myClassId, deckId) => {
  return axios.get(API_URL_PUBLIC + "download/" + myClassId + "/" + deckId,{ headers: authHeader() })
}

export default {
  getDecks,
  shareDeck,
  downloadDeck,
}