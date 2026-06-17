package com.cibertec.gestionestudiantes.webservice;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
// declaramos la clase de configuracion principal
public class ConfiguracionREST extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        // instanciamos el set de clases
        Set<Class<?>> classes = new HashSet<>();
        // agregamos los controladores manualmente
        classes.add(EstudianteController.class);
        classes.add(CursoController.class);
        classes.add(NotaController.class);
        classes.add(AuthController.class);
        classes.add(CorsFilter.class);
        // retornamos las clases registradas
        return classes;
    } // fin del metodo
} // fin de la clase...
