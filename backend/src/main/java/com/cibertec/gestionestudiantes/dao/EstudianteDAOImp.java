package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.bd.ConectarBD;
import com.cibertec.gestionestudiantes.model.Estudiante;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAOImp implements EstudianteDAO {

    @Override
    public void registrarEstudiante(Estudiante estudiante) {
        // realizamos la cadena.....
        String sql = "INSERT INTO estudiantes (codigo, nombre, apellido, email) VALUES (?, ?, ?, ?)";
        // declaramos la interface...
        PreparedStatement ps = null;
        // hacemos la respectiva vinculacion...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            // asignamos los parametros...
            ps.setString(1, estudiante.getCodigo());
            ps.setString(2, estudiante.getNombre());
            ps.setString(3, estudiante.getApellido());
            ps.setString(4, estudiante.getEmail());
            // realizamos la ejecucion..
            int x = ps.executeUpdate();
            // aplicamos una condicion..
            if (x > 0) {
                System.out.println("estudiante registrado en la BD");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void actualizarEstudiante(Estudiante estudiante) {
        // realizamos la cadena.....
        String sql = "UPDATE estudiantes SET codigo=?, nombre=?, apellido=?, email=? WHERE id=?";
        PreparedStatement ps = null;
        // vinculamos con la bd...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            ps.setString(1, estudiante.getCodigo());
            ps.setString(2, estudiante.getNombre());
            ps.setString(3, estudiante.getApellido());
            ps.setString(4, estudiante.getEmail());
            ps.setLong(5, estudiante.getId());
            // realizamos la ejecucion..
            int z = ps.executeUpdate();
            // aplicamos una condicion...
            if (z > 0) {
                System.out.println("estudiante actualizado en BD");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void eliminarEstudiante(Long id) {
        // realizamo la respectiva cadena...
        String sql = "DELETE FROM estudiantes WHERE id=?";
        PreparedStatement ps = null;
        // vinculamos con la bd....
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            // pasamos el parametro...
            ps.setLong(1, id);
            // la realizamos al ejecucion...
            int m = ps.executeUpdate();
            // aplicamos una condicion...
            if (m > 0) {
                System.out.println("estudiante eliminado");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch....
    } // fin del metodo....

    @Override
    public Estudiante buscarEstudiante(Long id) {
        // realizamos la respectiva cadena...
        String sql = "SELECT * FROM estudiantes WHERE id=?";
        PreparedStatement ps = null;
        ResultSet rs = null;
        Estudiante busestudiante = new Estudiante();
        // realizamos la respectiva vinculacion...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            // aplicamos una condicion...
            if (rs.next()) {
                busestudiante.setId(rs.getLong("id"));
                busestudiante.setCodigo(rs.getString("codigo"));
                busestudiante.setNombre(rs.getString("nombre"));
                busestudiante.setApellido(rs.getString("apellido"));
                busestudiante.setEmail(rs.getString("email"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch.....
        return busestudiante.getId() != null ? busestudiante : null;
    } // fin del metodo...

    @Override
    public List<Estudiante> listadoEstudiantes() {
        // realizamos la respectiva cadena....
        String sql = "SELECT * FROM estudiantes";
        // aplicamos las intefaces...
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Estudiante> listado = new ArrayList<>();

        // vinculamos
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            rs = ps.executeQuery();
            // aplicamos un bucle...
            while (rs.next()) {
                Estudiante clest = new Estudiante();
                clest.setId(rs.getLong("id"));
                clest.setCodigo(rs.getString("codigo"));
                clest.setNombre(rs.getString("nombre"));
                clest.setApellido(rs.getString("apellido"));
                clest.setEmail(rs.getString("email"));
                // agregamos al listado
                listado.add(clest);
            } // fin del bucle...
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch...
          // retornamos el listado
        return listado;
    } // fin del metodo.....
} // fin de la clase.....
