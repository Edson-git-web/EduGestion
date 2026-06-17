package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.model.Curso;
import java.util.List;

//declaramos la interface CursoDAO
public interface CursoDAO {
    // declaramos los metodos abstractos
    void registrarCurso(Curso curso);

    void actualizarCurso(Curso curso);

    void eliminarCurso(Long id);

    Curso buscarCurso(Long id);

    List<Curso> listadoCursos();
} // fin de la interface....
