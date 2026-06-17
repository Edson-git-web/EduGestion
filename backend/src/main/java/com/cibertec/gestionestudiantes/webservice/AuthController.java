package com.cibertec.gestionestudiantes.webservice;

import com.cibertec.gestionestudiantes.dao.UsuarioDAOImp;
import com.cibertec.gestionestudiantes.model.Usuario;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth")
public class AuthController {

    UsuarioDAOImp dao = new UsuarioDAOImp();

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Usuario credenciales) {
        if (credenciales == null || credenciales.getUsername() == null || credenciales.getPassword() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("{\"error\": \"Credenciales incompletas\"}")
                    .build();
        }

        Usuario usuario = dao.login(credenciales.getUsername(), credenciales.getPassword());

        if (usuario == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\": \"Usuario o contraseña incorrectos\"}").build();
        }

        // Para mantenerlo simple, devolvemos el usuario completo (sin la contraseña en
        // un entorno real, pero aquí sirve para pasar el rol al frontend)
        usuario.setPassword(null); // Borramos el pass por seguridad antes de enviarlo
        return Response.ok(usuario).build();
    }
}
