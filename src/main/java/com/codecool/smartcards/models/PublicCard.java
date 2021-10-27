package com.codecool.smartcards.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="public_cards")
public class PublicCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=4500)
    private String question;

    @Column(nullable = false, length=4500)
    private String answer;

    @ManyToOne(fetch = FetchType.LAZY)
    private PublicDeck publicDeck;

    public PublicCard() {
    }

    public PublicCard(String question, String answer, PublicDeck publicDeck) {
        this.question = question;
        this.answer = answer;
        this.publicDeck = publicDeck;
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public PublicDeck getPublicDeck() {
        return publicDeck;
    }

    public void setPublicDeck(PublicDeck publicDeck) {
        this.publicDeck = publicDeck;
    }
}