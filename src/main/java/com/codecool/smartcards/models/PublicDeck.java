package com.codecool.smartcards.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

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

    public PublicDeck() {
    }

    public PublicDeck(String title, boolean isPublic) {
        this.title = title;
        this.isPublic = isPublic;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }
}
