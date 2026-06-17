package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.model.Nota;
import java.util.List;

//declaramos la interface NotaDAO
public interface NotaDAO {
    // declaramos los metodos abstractos
    void registrarNota(Nota nota);

    void actualizarNota(Nota nota);

    void eliminarNota(Long id);

    Nota buscarNota(Long id);

    List<Nota> listadoNotas();
} // fin de la interface....
