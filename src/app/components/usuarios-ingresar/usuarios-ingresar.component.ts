import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {

  user={  usuario:"", password:""}; //defino la variable
  reintentar:boolean=false;
  mensaje:string="";
  
	constructor(private usuariosService: UsuariosService, private router:Router) { } //defino la variable usuariosService como un objeto UsuariosService segun se importo

  ngOnInit(): void {
  }

  ingresar(){ //Metodo que se llama desde el formulario HTML
		console.log("Sign In");
    console.log(this.user);
    
    this.usuariosService.ingresar(this.user).subscribe( //
      /*res => { //bloque de ejecucion cuando la conexion con el server es exitosa
        console.log(res);
      },
      err => console.log(err) //bloque de ejecucion cuando la conexion con el server arrojo error
      */
      res => {
        let result:any=res;
        console.log(result);
        localStorage.setItem('token',result.token); //localStorage: variable conocida por Angular, paso atributo y su valor
        this.router.navigate(['usuarios/home']); //redireccion
      },
      err => {        
        console.log(err.error.message);
        this.reintentar=true;
        this.mensaje=err.error.message;
      }
    )
	}

  recargarForm(){
    this.reintentar=false;
    this.user.usuario="";
    this.user.password="";
	  this.mensaje="";
  }

}
