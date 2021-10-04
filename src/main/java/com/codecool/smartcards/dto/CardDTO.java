package com.codecool.smartcards.dto;


public class CardDTO {

    private Long id;
    private String question;
    private String answer;
    private Long deckID;
    private Long myClassID;
    private Long userID;


    public CardDTO() {
    }

    public CardDTO(Long id, String question, String answer, Long deckID, Long myClassID, Long userID) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.deckID = deckID;
        this.myClassID = myClassID;
        this.userID = userID;
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Long getDeckID() {
        return deckID;
    }

    public Long getMyClassID() {
        return myClassID;
    }

    public Long getUserID() {
        return userID;
    }
}
