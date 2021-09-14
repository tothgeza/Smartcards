package com.codecool.smartcards.models;

import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

//    @ManyToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(targetEntity = Deck.class, cascade = CascadeType.ALL)
    @JoinTable(name = "user_decks",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "deck_id", referencedColumnName = "id"))
    private List<Deck> decks = new ArrayList<>();

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
