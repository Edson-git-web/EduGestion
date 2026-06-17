package com.cibertec.gestionestudiantes.bd;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

//creamos la clase para conectar a la BD
public class ConectarBD {

    // Parameters for local database connection
    // declaramos las variables de conexion
    public static String url = "jdbc:mysql://localhost:3306/gestion_estudiantes";
    public static String usuario = "root";
    public static String password = "";
    private static Connection cn;

    // metodo para obtener la conexion
    public static Connection getConexion() {
        try {
            // registramos el driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            // establecemos la conexion
            cn = DriverManager.getConnection(url, usuario, password);
        } catch (ClassNotFoundException | SQLException e) {
            // imprimimos el error
            e.printStackTrace();
        } // fin del catch
          // retornamos la conexion
        return cn;
    } // fin del metodo
} // fin de la clase...
