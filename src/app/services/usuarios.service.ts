import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService{
	//API_URI = 'http://localhost:3000/user'; //variable local a la clase con la ruta
	API_URI = 'https://dstpwebpeceraserver.herokuapp.com/user';
	
	constructor(private http: HttpClient, private router:Router) { }

	listarUsuarios(){ //METODO
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/list`); //http: variable definida en el constructor / Parametro se pasa la ruta principal seguida del metodo q quiero utilizar
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	
	buscarUsuario(id:string){ //METODO
		return this.http.get(`${this.API_URI}/find/${id}`);
	}

	guardarUsuario(usuario: Usuario){
		return this.http.post(`${this.API_URI}/create`,usuario);
	}
	
	eleminarUsuario(id:string){
		return this.http.delete(`${this.API_URI}/delete/${id}`);
	}
	
	actualizarUsuario(id:string, actualizaUsuario: Usuario):Observable<Usuario>{ //Observable: se utiliza para pasar objetos de tipo "algo", en este caso de tipo Usuario
		return this.http.put(`${this.API_URI}/update/${id}`,actualizaUsuario);
	}

	ingresar(usuario:any){
	return this.http.post(`${this.API_URI}/signin`,usuario);
	}

	registrar(usuario:any){
		return this.http.post(`${this.API_URI}/signup`,usuario);
	}

	isLoggedIn():Boolean{
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}

	logOut(){
		localStorage.removeItem('token');
		this.router.navigate(['usuarios/principal']);
	}

	getToken(){//Obtenemos el token que despues enviara el interceptor x cada req
		return localStorage.getItem('token');
	}
}