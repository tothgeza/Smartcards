package com.codecool.smartcards.dto;

public class PublicDeckDTO {

    private Long id;
    private String title;
    private boolean isPublic = false;

    public PublicDeckDTO() {
    }

    public PublicDeckDTO(Long id, String title, boolean isPublic) {
        this.id = id;
        this.title = title;
        this.isPublic = isPublic;
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


}
