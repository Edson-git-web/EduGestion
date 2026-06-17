package com.cibertec.gestionestudiantes.model;

//declaramos la clase entidad Curso

public class Curso {

    // declaramos los atributos de la clase
    private Long id;
    private String codigo;
    private String nombre;
    private String descripcion;
    private Integer creditos;

    // As in standard old-school JDBC, relationships (like List<Nota>) are often
    // avoided in the base POJO
    // unless strictly needed by a join query for JSON presentation. Simplifying to
    // match native JDBC logic.

    // creamos el constructor vacio
    public Curso() {
    } // fin del constructor...

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getCreditos() {
        return creditos;
    } // fin del metodo

    public void setCreditos(Integer creditos) {
        this.creditos = creditos;
    } // fin del metodo

    public Long getId() {
        return id;
    } // fin del metodo

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
