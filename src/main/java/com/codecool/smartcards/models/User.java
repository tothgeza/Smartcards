package com.codecool.smartcards.models;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(max = 20)
    @Column(nullable = false)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false)
    private String password;

    //    @ManyToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(targetEntity = MyClass.class, cascade = CascadeType.ALL)
    @JoinTable(name = "user_myclasses",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "myclass_id", referencedColumnName = "id"))
    private List<MyClass> myClasses = new ArrayList<>();

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public List<MyClass> getMyClasses() {
        return myClasses;
    }

    public void setMyClasses(List<MyClass> myClasses) {
        this.myClasses = myClasses;
    }

    public MyClass getMyClassById(long id) {
        return myClasses.stream().filter(d -> d.getId() == id).findFirst().get();
    }

    public void addMyClass(MyClass newMyClass) {
        myClasses.add(newMyClass);
    }

    public void deleteMyClass(long myclass_id) {
        myClasses = myClasses.stream().filter(c -> c.getId() != myclass_id).collect(Collectors.toList());
    }
}
