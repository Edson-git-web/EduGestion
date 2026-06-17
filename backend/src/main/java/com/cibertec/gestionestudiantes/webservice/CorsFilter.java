package com.cibertec.gestionestudiantes.webservice;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
// declaramos la clase de filtro cors para conectar con react
public class CorsFilter implements ContainerResponseFilter {

        @Override
        public void filter(ContainerRequestContext requestContext,
                        ContainerResponseContext responseContext) throws IOException {
                // asignamos las cabeceras permitidas
                responseContext.getHeaders().add(
                                "Access-Control-Allow-Origin", "*");
                responseContext.getHeaders().add(
                                "Access-Control-Allow-Credentials", "true");
                responseContext.getHeaders().add(
                                "Access-Control-Allow-Headers",
                                "origin, content-type, accept, authorization, x-requested-with");
                responseContext.getHeaders().add(
                                "Access-Control-Allow-Methods",
                                "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        } // fin del metodo
} // fin de la clase...
