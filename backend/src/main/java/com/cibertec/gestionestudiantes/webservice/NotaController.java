package com.cibertec.gestionestudiantes.webservice;

import com.cibertec.gestionestudiantes.dao.NotaDAOImp;
import com.cibertec.gestionestudiantes.model.Nota;

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

@Path("/notas")
public class NotaController {

    // instanciamos la respectiva clase DAO...
    NotaDAOImp dao = new NotaDAOImp();

    @GET
    @Path("/Listado")
    @Produces(MediaType.APPLICATION_JSON)
    // creamos el metodo listado de notas...
    public Response listadoNotas() {
        List<Nota> listar = dao.listadoNotas();
        // retornamos el listado
        return Response.ok(listar).build();
    } // fin del metodo...

    // ******* creamos el metodo registrar...
    @POST
    @Path("/crear")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNota(Nota nota) {
        // invocamos el metodo registrar
        dao.registrarNota(nota);
        // retornamos la respuesta de exito
        return Response.status(Response.Status.CREATED).build();
    } // fin del metodo

    // ************* creamos el metodo buscar...
    @GET
    @Path("/buscar/{cod}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarNotaId(@PathParam("cod") Long cod) {
        // invocamos el metodo buscar...
        Nota nota = dao.buscarNota(cod);
        // aplicamos una condicion...
        if (nota == null) {
            return Response.status(Status.BAD_REQUEST).entity("nota no encontrada").build();
        } else {
            // retornamos el objeto buscado.....
            return Response.ok(nota).build();
        } // fin de else...
    } // fin del metodo......

    // ******************** metodo actualizar...
    @PUT
    @Path("/actualizar")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response actualizarNota(Nota nota) {
        Nota no = dao.buscarNota(nota.getId());
        // aplicamos una condicion...
        if (no == null) {
            return Response.status(Status.BAD_REQUEST).entity("nota no encontrada").build();
        } else {
            // invocamos al metodo actualizar...
            dao.actualizarNota(nota);
            List<Nota> list2 = dao.listadoNotas();
            // retornamos el listado con el registro actualizado
            return Response.ok(list2).build();
        } // fin de la condicion...
    } // fin del mtodo.....

    // ********metodo eliminar...
    @DELETE
    @Path("/eliminar/{cod}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarNota(@PathParam("cod") Long cod) {
        Nota no = dao.buscarNota(cod);
        // aplicamos una condicion...
        if (no == null) {
            return Response.status(Status.BAD_REQUEST).entity("nota no encontrada").build();
        } else {
            // invocamos al metodo eliminar...
            dao.eliminarNota(cod);
            List<Nota> liseliminar = dao.listadoNotas();
            // retornamos
            return Response.ok(liseliminar).build();
        } // fin de la condicion...
    } // fin del metodo....
} // fin de la clase....
