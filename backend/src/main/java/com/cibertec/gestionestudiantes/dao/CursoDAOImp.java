package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.bd.ConectarBD;
import com.cibertec.gestionestudiantes.model.Curso;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CursoDAOImp implements CursoDAO {

    @Override
    public void registrarCurso(Curso curso) {
        // realizamos la cadena.....
        String sql = "INSERT INTO cursos (nombre, codigo, descripcion, creditos) VALUES (?, ?, ?, ?)";
        // declaramos la interface...
        PreparedStatement ps = null;
        // hacemos la respectiva vinculacion...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            // asignamos los parametros...
            ps.setString(1, curso.getNombre());
            ps.setString(2, curso.getCodigo());
            ps.setString(3, curso.getDescripcion());
            ps.setInt(4, curso.getCreditos() != null ? curso.getCreditos() : 0);
            // realizamos la ejecucion..
            int x = ps.executeUpdate();
            // aplicamos una condicion..
            if (x > 0) {
                System.out.println("curso registrado en la BD");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void actualizarCurso(Curso curso) {
        // realizamos la cadena.....
        String sql = "UPDATE cursos SET nombre=?, codigo=?, descripcion=?, creditos=? WHERE id=?";
        PreparedStatement ps = null;
        // vinculamos con la bd...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            ps.setString(1, curso.getNombre());
            ps.setString(2, curso.getCodigo());
            ps.setString(3, curso.getDescripcion());
            ps.setInt(4, curso.getCreditos() != null ? curso.getCreditos() : 0);
            ps.setLong(5, curso.getId());
            // realizamos la ejecucion..
            int z = ps.executeUpdate();
            // aplicamos una condicion...
            if (z > 0) {
                System.out.println("curso actualizado en BD");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void eliminarCurso(Long id) {
        // realizamo la respectiva cadena...
        String sql = "DELETE FROM cursos WHERE id=?";
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
                System.out.println("curso eliminado");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch....
    } // fin del metodo....

    @Override
    public Curso buscarCurso(Long id) {
        // realizamos la respectiva cadena...
        String sql = "SELECT * FROM cursos WHERE id=?";
        PreparedStatement ps = null;
        ResultSet rs = null;
        Curso buscurso = new Curso();
        // realizamos la respectiva vinculacion...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            // aplicamos una condicion...
            if (rs.next()) {
                buscurso.setId(rs.getLong("id"));
                buscurso.setNombre(rs.getString("nombre"));
                buscurso.setCodigo(rs.getString("codigo"));
                buscurso.setDescripcion(rs.getString("descripcion"));
                buscurso.setCreditos(rs.getInt("creditos"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch.....
        return buscurso.getId() != null ? buscurso : null;
    } // fin del metodo...

    @Override
    public List<Curso> listadoCursos() {
        // realizamos la respectiva cadena....
        String sql = "SELECT * FROM cursos";
        // aplicamos las intefaces...
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Curso> listado = new ArrayList<>();

        // vinculamos
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            rs = ps.executeQuery();
            // aplicamos un bucle...
            while (rs.next()) {
                Curso clcurso = new Curso();
                clcurso.setId(rs.getLong("id"));
                clcurso.setNombre(rs.getString("nombre"));
                clcurso.setCodigo(rs.getString("codigo"));
                clcurso.setDescripcion(rs.getString("descripcion"));
                clcurso.setCreditos(rs.getInt("creditos"));
                // agregamos al listado
                listado.add(clcurso);
            } // fin del bucle...
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch...
          // retornamos el listado
        return listado;
    } // fin del metodo.....
} // fin de la clase.....
