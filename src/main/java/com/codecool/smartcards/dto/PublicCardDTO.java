package com.codecool.smartcards.dto;

public class PublicCardDTO {

    private Long id;
    private String question;
    private String answer;
    private Long deckID;


    public PublicCardDTO() {
    }

    public PublicCardDTO(Long id, String question, String answer, Long deckID) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.deckID = deckID;
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

}
