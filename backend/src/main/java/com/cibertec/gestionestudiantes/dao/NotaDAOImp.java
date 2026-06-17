package com.cibertec.gestionestudiantes.dao;

import com.cibertec.gestionestudiantes.bd.ConectarBD;
import com.cibertec.gestionestudiantes.model.Nota;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class NotaDAOImp implements NotaDAO {

    @Override
    public void registrarNota(Nota nota) {
        nota.calcularPromedio();
        // realizamos la cadena.....
        String sql = "INSERT INTO notas (estudiante_id, curso_id, nota_practica, nota_parcial, nota_final, promedio) VALUES (?, ?, ?, ?, ?, ?)";
        // declaramos la interface...
        PreparedStatement ps = null;
        // hacemos la respectiva vinculacion...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            // asignamos los parametros...
            ps.setLong(1, nota.getEstudianteId());
            ps.setLong(2, nota.getCursoId());
            ps.setDouble(3, nota.getNotaPractica() != null ? nota.getNotaPractica() : 0.0);
            ps.setDouble(4, nota.getNotaParcial() != null ? nota.getNotaParcial() : 0.0);
            ps.setDouble(5, nota.getNotaFinal() != null ? nota.getNotaFinal() : 0.0);
            ps.setDouble(6, nota.getPromedio() != null ? nota.getPromedio() : 0.0);

            // realizamos la ejecucion..
            int x = ps.executeUpdate();
            // aplicamos una condicion..
            if (x > 0) {
                System.out.println("nota registrada en la BD");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void actualizarNota(Nota nota) {
        nota.calcularPromedio();
        // realizamos la cadena.....
        String sql = "UPDATE notas SET estudiante_id=?, curso_id=?, nota_practica=?, nota_parcial=?, nota_final=?, promedio=? WHERE id=?";
        PreparedStatement ps = null;
        // vinculamos con la bd...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            ps.setLong(1, nota.getEstudianteId());
            ps.setLong(2, nota.getCursoId());
            ps.setDouble(3, nota.getNotaPractica() != null ? nota.getNotaPractica() : 0.0);
            ps.setDouble(4, nota.getNotaParcial() != null ? nota.getNotaParcial() : 0.0);
            ps.setDouble(5, nota.getNotaFinal() != null ? nota.getNotaFinal() : 0.0);
            ps.setDouble(6, nota.getPromedio() != null ? nota.getPromedio() : 0.0);
            ps.setLong(7, nota.getId());

            // realizamos la ejecucion..
            int z = ps.executeUpdate();
            // aplicamos una condicion...
            if (z > 0) {
                System.out.println("nota actualizada en BD");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void eliminarNota(Long id) {
        // realizamo la respectiva cadena...
        String sql = "DELETE FROM notas WHERE id=?";
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
                System.out.println("nota eliminada");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch....
    } // fin del metodo....

    @Override
    public Nota buscarNota(Long id) {
        // realizamos la respectiva cadena...
        String sql = "SELECT * FROM notas WHERE id=?";
        PreparedStatement ps = null;
        ResultSet rs = null;
        Nota busnota = new Nota();
        // realizamos la respectiva vinculacion...
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            // aplicamos una condicion...
            if (rs.next()) {
                busnota.setId(rs.getLong("id"));
                busnota.setEstudianteId(rs.getLong("estudiante_id"));
                busnota.setCursoId(rs.getLong("curso_id"));
                busnota.setNotaPractica(rs.getDouble("nota_practica"));
                busnota.setNotaParcial(rs.getDouble("nota_parcial"));
                busnota.setNotaFinal(rs.getDouble("nota_final"));
                busnota.setPromedio(rs.getDouble("promedio"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch.....
        return busnota.getId() != null ? busnota : null;
    } // fin del metodo...

    @Override
    public List<Nota> listadoNotas() {
        // realizamos la respectiva cadena....
        String sql = "SELECT * FROM notas";
        // aplicamos las intefaces...
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Nota> listado = new ArrayList<>();

        // vinculamos
        try {
            ps = ConectarBD.getConexion().prepareStatement(sql);
            rs = ps.executeQuery();
            // aplicamos un bucle...
            while (rs.next()) {
                Nota clnota = new Nota();
                clnota.setId(rs.getLong("id"));
                clnota.setEstudianteId(rs.getLong("estudiante_id"));
                clnota.setCursoId(rs.getLong("curso_id"));
                clnota.setNotaPractica(rs.getDouble("nota_practica"));
                clnota.setNotaParcial(rs.getDouble("nota_parcial"));
                clnota.setNotaFinal(rs.getDouble("nota_final"));
                clnota.setPromedio(rs.getDouble("promedio"));
                // agregamos al listado
                listado.add(clnota);
            } // fin del bucle...
        } catch (SQLException e) {
            e.printStackTrace();
        } // fin del catch...
          // retornamos el listado
        return listado;
    } // fin del metodo.....
} // fin de la clase.....
