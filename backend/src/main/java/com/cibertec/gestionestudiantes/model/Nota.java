package com.cibertec.gestionestudiantes.model;

//declaramos la clase entidad Nota
public class Nota {

    // declaramos los atributos de la clase
    private Long id;
    private Long estudianteId;
    private Long cursoId;
    private Double notaPractica;
    private Double notaParcial;
    private Double notaFinal;
    private Double promedio;

    // creamos el constructor vacio
    public Nota() {
    } // fin del constructor...

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEstudianteId() {
        return estudianteId;
    }

    public void setEstudianteId(Long estudianteId) {
        this.estudianteId = estudianteId;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public Double getNotaPractica() {
        return notaPractica;
    }

    public void setNotaPractica(Double notaPractica) {
        this.notaPractica = notaPractica;
    }

    public Double getNotaParcial() {
        return notaParcial;
    }

    public void setNotaParcial(Double notaParcial) {
        this.notaParcial = notaParcial;
    }

    public Double getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Double notaFinal) {
        this.notaFinal = notaFinal;
    }

    public Double getPromedio() {
        return promedio;
    }

    public void setPromedio(Double promedio) {
        this.promedio = promedio;
    }

    public void calcularPromedio() {
        // aplicamos la logica del calculo
        if (notaPractica != null && notaParcial != null && notaFinal != null) {
            this.promedio = (notaPractica * 0.20) + (notaParcial * 0.30) + (notaFinal * 0.50);
        } // fin de la condicion
    } // fin del metodo
} // fin de la clase....
