package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.bd.ConectarBD;
import com.cibertec.gestionestudiantes.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UsuarioDAOImp implements UsuarioDAO {

    @Override
    public Usuario login(String username, String password) {
        Usuario usuario = null;
        String sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";

        try (Connection con = ConectarBD.getConexion();
                PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, username);
            ps.setString(2, password);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    usuario = new Usuario();
                    usuario.setId(rs.getLong("id"));
                    usuario.setUsername(rs.getString("username"));
                    usuario.setPassword(rs.getString("password"));
                    usuario.setRole(rs.getString("role"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return usuario;
    }
}
