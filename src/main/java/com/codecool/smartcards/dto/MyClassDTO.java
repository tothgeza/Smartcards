package com.codecool.smartcards.dto;


public class MyClassDTO {
    private Long id;
    private String title;
    private Long user_id;

    public MyClassDTO() {}

    public MyClassDTO(Long id, String title, Long user_id) {
        this.id = id;
        this.title = title;
        this.user_id = user_id;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Long getUser_id() {
        return user_id;
    }
}
