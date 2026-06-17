package com.cibertec.gestionestudiantes.webservice;

import com.cibertec.gestionestudiantes.dao.CursoDAOImp;
import com.cibertec.gestionestudiantes.model.Curso;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/cursos")
public class CursoController {

    // instanciamos la respectiva clase DAO...
    CursoDAOImp dao = new CursoDAOImp();

    @GET
    @Path("/Listado")
    @Produces(MediaType.APPLICATION_JSON)
    // creamos el metodo listado de cursos...
    public Response listadoCursos() {
        List<Curso> listar = dao.listadoCursos();
        // retornamos el listado
        return Response.ok(listar).build();
    } // fin del metodo...

    // ******* creamos el metodo registrar...
    @POST
    @Path("/crear")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createCurso(Curso curso) {
        // invocamos el metodo registrar
        dao.registrarCurso(curso);
        // retornamos la respuesta de exito
        return Response.status(Response.Status.CREATED).build();
    } // fin del metodo

    // ************* creamos el metodo buscar...
    @GET
    @Path("/buscar/{cod}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarCursoId(@PathParam("cod") Long cod) {
        // invocamos el metodo buscar...
        Curso cur = dao.buscarCurso(cod);
        // aplicamos una condicion...
        if (cur == null) {
            return Response.status(Status.BAD_REQUEST).entity("curso no encontrado").build();
        } else {
            // retornamos el objeto buscado.....
            return Response.ok(cur).build();
        } // fin de else...
    } // fin del metodo......

    // ******************** metodo actualizar...
    @PUT
    @Path("/actualizar")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response actualizarCurso(Curso curso) {
        Curso cur = dao.buscarCurso(curso.getId());
        // aplicamos una condicion...
        if (cur == null) {
            return Response.status(Status.BAD_REQUEST).entity("curso no encontrado").build();
        } else {
            // invocamos al metodo actualizar...
            dao.actualizarCurso(curso);
            List<Curso> list2 = dao.listadoCursos();
            // retornamos el listado con el registro actualizado
            return Response.ok(list2).build();
        } // fin de la condicion...
    } // fin del mtodo.....

    // ********metodo eliminar...
    @DELETE
    @Path("/eliminar/{cod}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarCurso(@PathParam("cod") Long cod) {
        Curso cur = dao.buscarCurso(cod);
        // aplicamos una condicion...
        if (cur == null) {
            return Response.status(Status.BAD_REQUEST).entity("curso no encontrado").build();
        } else {
            // invocamos al metodo eliminar...
            dao.eliminarCurso(cod);
            List<Curso> liseliminar = dao.listadoCursos();
            // retornamos
            return Response.ok(liseliminar).build();
        } // fin de la condicion...
    } // fin del metodo....
} // fin de la clase....
