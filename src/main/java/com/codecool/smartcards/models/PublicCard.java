package com.codecool.smartcards.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="public_cards")
public class PublicCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String question;

    @NotBlank
    @Column(nullable = false)
    private String answer;

    @NotBlank
    @ManyToOne(fetch = FetchType.LAZY)
    private Deck deck;

    public PublicCard() {
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

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }
}