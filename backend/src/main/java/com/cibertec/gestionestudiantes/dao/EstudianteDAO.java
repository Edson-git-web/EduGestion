package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.model.Estudiante;
import java.util.List;

//declaramos la interface EstudianteDAO
public interface EstudianteDAO {
    // declaramos los metodos abstractos
    void registrarEstudiante(Estudiante estudiante);

    void actualizarEstudiante(Estudiante estudiante);

    void eliminarEstudiante(Long id);

    Estudiante buscarEstudiante(Long id);

    List<Estudiante> listadoEstudiantes();
} // fin de la interface....
