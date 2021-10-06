import axios from "axios";
import authHeader from "./auth-header";

const API_URL_CARD = "http://localhost:8080/api/card/";

const getCards = async (deckId) => {
  console.log("ID: " + deckId)
  console.log("Start fetching...")
  console.log("URL: " + API_URL_CARD + "deck/" + deckId)
  return axios.get(API_URL_CARD + "deck/" + deckId, { headers: authHeader() });
}

const createCard = (deckId, question, answer) => {
  return axios
    .post(API_URL_CARD + "deck/" + deckId , {
      question,
      answer
    }, { headers: authHeader() });
}

const updateCard = (cardId, question, answer) => {
  return axios
    .put(API_URL_CARD + cardId, {
      question,
      answer
    }, { headers: authHeader() })
}

const deleteCard = (cardId) => {
  return axios
    .delete(API_URL_CARD + cardId, { headers: authHeader() });
}

export default {
  getCards,
  createCard,
  updateCard,
  deleteCard
}