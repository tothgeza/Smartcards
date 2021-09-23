package com.codecool.smartcards.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name ="myclasses")
public class MyClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @OneToMany(targetEntity = Deck.class, cascade = CascadeType.ALL)
    @JoinTable(name = "myclasses_decks",
            joinColumns = @JoinColumn(name = "myclass_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "deck_id", referencedColumnName = "id"))
    private List<Deck> decks = new ArrayList<>();

    public MyClass() {}

    public MyClass(String title) {
        this.title = title;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Deck> getDecks() {
        return decks;
    }

    public void setDecks(List<Deck> decks) {
        this.decks = decks;
    }

    public Deck getDeckById(long id) {
        return decks.stream().filter(d -> d.getId() == id).findFirst().get();
    }

    public void addDeck(Deck newDeck) {
        decks.add(newDeck);
    }

    public void deleteDeck(long deck_id) {
        decks = decks.stream().filter(d -> d.getId() != deck_id).collect(Collectors.toList());
    }
}
