package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.model.Usuario;

public interface UsuarioDAO {
    // Método para validar credenciales y retornar el usuario (con su rol) si son
    // correctas.
    Usuario login(String username, String password);
}
