package com.cibertec.gestionestudiantes.model;

//declaramos la clase entidad...
public class Usuario {

    // declaramos los atributos de la clase
    private Long id;
    private String username;
    private String password;
    private String role;

    // creamos el constructor vacio
    public Usuario() {
    } // fin del constructor

    // creamos el constructor con parametros
    public Usuario(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    } // fin del constructor

    // metodos encapsuladores
    public static UsuarioBuilder builder() {
        return new UsuarioBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    } // fin de getters y setters

    public static class UsuarioBuilder {
        private String username;
        private String password;
        private String role;

        public UsuarioBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UsuarioBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UsuarioBuilder role(String role) {
            this.role = role;
            return this;
        }

        public Usuario build() {
            return new Usuario(username, password, role);
        } // fin de clases
    } // fin del builder
} // fin de la clase....
