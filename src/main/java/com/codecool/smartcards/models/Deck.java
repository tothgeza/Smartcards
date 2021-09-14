package com.codecool.smartcards.models;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="decks")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private boolean isPublic = false;


    @OneToMany(targetEntity = Card.class, cascade = CascadeType.ALL)
    private List<Card> cards;

    public Card getCardById(long id){
        return cards.stream().filter(c -> c.getId() == id).findFirst().get();
    }
    public void addCard(Card newCard){
        cards.add(newCard);
    }

    public void deleteCard(long card_id) {
        cards = cards.stream().filter(c -> c.getId() != card_id).collect(Collectors.toList());
    }
}
