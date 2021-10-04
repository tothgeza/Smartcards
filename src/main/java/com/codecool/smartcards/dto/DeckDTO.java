package com.codecool.smartcards.dto;


public class DeckDTO {

    private Long id;
    private String title;
    private boolean isPublic = false;
    private Long myClassID;
    private Long userID;

    public DeckDTO() {
    }

    public DeckDTO(Long id, String title, boolean isPublic, Long myClassID, Long userID) {
        this.id = id;
        this.title = title;
        this.isPublic = isPublic;
        this.myClassID = myClassID;
        this.userID = userID;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public Long getMyClassID() {
        return myClassID;
    }

    public Long getUserID() {
        return userID;
    }
}
