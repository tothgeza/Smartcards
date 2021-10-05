import axios from "axios";
import authHeader from "./auth-header";

const API_URL_DECK = "http://localhost:8080/api/deck/";

const getDecks = async (myClassId) => {
  return axios.get(API_URL_DECK + "myClass/" + myClassId, { headers: authHeader() });
}

const createDeck = (myClassId, title) => {
  return axios
    .post(API_URL_DECK + "myClass/" + myClassId , {
      title,
    }, { headers: authHeader() });
}

const updateDeck = (deckId, title) => {
  return axios
    .put(API_URL_DECK + deckId, {
      title
    }, { headers: authHeader() })
}

const deleteDeck = (deckId) => {
  return axios
    .delete(API_URL_DECK + deckId, { headers: authHeader() });
}

export default {
  getDecks,
  createDeck,
  updateDeck,
  deleteDeck
}