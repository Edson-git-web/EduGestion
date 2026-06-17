package com.cibertec.gestionestudiantes.model;

//declaramos la clase entidad Estudiante

public class Estudiante {

    // declaramos los atributos
    private Long id;
    private String codigo;
    private String nombre;
    private String apellido;
    private String email;

    // creamos el constructor vacio
    public Estudiante() {
    } // fin del constructor...

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    } // fin del metodo
} // fin de la clase....
