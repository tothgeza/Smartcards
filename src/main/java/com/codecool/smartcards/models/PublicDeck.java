package com.codecool.smartcards.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="public_decks")
public class PublicDeck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private boolean isPublic = false;


    @OneToMany(targetEntity = PublicCard.class,cascade = CascadeType.ALL)
    private List<PublicCard> cards;

    public PublicCard getCardById(long id){
        return cards.stream().filter(c -> c.getId() == id).findFirst().get();
    }
    public void addCard(PublicCard newCard){
        cards.add(newCard);
    }

    public void deleteCard(long card_id) {
        cards = cards.stream().filter(c -> c.getId() != card_id).collect(Collectors.toList());
    }
}
