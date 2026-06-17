package com.cibertec.gestionestudiantes.webservice;

import com.cibertec.gestionestudiantes.dao.EstudianteDAOImp;
import com.cibertec.gestionestudiantes.model.Estudiante;

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

@Path("/estudiantes")
public class EstudianteController {

    // instanciamos la respectiva clase DAO...
    EstudianteDAOImp dao = new EstudianteDAOImp();

    @GET
    @Path("/Listado")
    @Produces(MediaType.APPLICATION_JSON)
    // creamos el metodo listado de estudiantes...
    public Response listadoEstudiantes() {
        List<Estudiante> listar = dao.listadoEstudiantes();
        // retornamos el listado
        return Response.ok(listar).build();
    } // fin del metodo...

    // ******* creamos el metodo registrar...
    @POST
    @Path("/crear")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEstudiante(Estudiante estudiante) {
        // invocamos el metodo registrar
        dao.registrarEstudiante(estudiante);
        // retornamos la respuesta de exito
        return Response.status(Response.Status.CREATED).build();
    } // fin del metodo

    // ************* creamos el metodo buscar...
    @GET
    @Path("/buscar/{cod}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarEstudianteId(@PathParam("cod") Long cod) {
        // invocamos el metodo buscar...
        Estudiante est = dao.buscarEstudiante(cod);
        // aplicamos una condicion...
        if (est == null) {
            return Response.status(Status.BAD_REQUEST).entity("estudiante no encontrado").build();
        } else {
            // retornamos el objeto buscado.....
            return Response.ok(est).build();
        } // fin de else...
    } // fin del metodo......

    // ******************** metodo actualizar...
    @PUT
    @Path("/actualizar")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response actualizarEstudiante(Estudiante estudiante) {
        Estudiante est = dao.buscarEstudiante(estudiante.getId());
        // aplicamos una condicion...
        if (est == null) {
            return Response.status(Status.BAD_REQUEST).entity("estudiante no encontrado").build();
        } else {
            // invocamos al metodo actualizar...
            dao.actualizarEstudiante(estudiante);
            List<Estudiante> list2 = dao.listadoEstudiantes();
            // retornamos el listado con el registro actualizado
            return Response.ok(list2).build();
        } // fin de la condicion...
    } // fin del mtodo.....

    // ********metodo eliminar...
    @DELETE
    @Path("/eliminar/{cod}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarEstudiante(@PathParam("cod") Long cod) {
        Estudiante est = dao.buscarEstudiante(cod);
        // aplicamos una condicion...
        if (est == null) {
            return Response.status(Status.BAD_REQUEST).entity("estudiante no encontrado").build();
        } else {
            // invocamos al metodo eliminar...
            dao.eliminarEstudiante(cod);
            List<Estudiante> liseliminar = dao.listadoEstudiantes();
            // retornamos
            return Response.ok(liseliminar).build();
        } // fin de la condicion...
    } // fin del metodo....
} // fin de la clase....
