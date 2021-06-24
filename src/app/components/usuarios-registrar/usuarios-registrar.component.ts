import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
	
@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit { //Clase

  user={  nombre:"", email:"", password:"",repassword:""};
  errorNombre=0;
  errrorPassword=0;
  errorRePassrword=0;
  errorEmail=0;

  constructor(private usuariosService: UsuariosService) { } //defino la variable usuariosService como un objeto UsuariosService segun se importo

  ngOnInit(): void { //Metodo: ngOnInit: representa el estado del objeto al momento de su creacion
  }  

	registrar(){ //Metodo que se llama desde el formulario HTML
		console.log("Sign Up");
    console.log(this.user)
    
    this.usuariosService.registrar(this.user).subscribe(
      /*res => { //bloque de ejecucion cuando la conexion con el server es exitosa
        console.log(res);
      },
      err => console.log(err) //bloque de ejecucion cuando la conexion con el server arrojo error
      */
      res => {
        let result:any=res;
        console.log(result.message);
      },
      err => {
        console.log(err.error.message);
      }
    )
	}

  verificarForm():boolean{
    this.errorNombre=this.verificarNombre(this.user.nombre);
    this.errrorPassword=this.verificarPassword(this.user.password);
    this.errorRePassrword=this.verificarRePassword(this.user.password, this.user.repassword);
    this.errorEmail=this.verificarEmail(this.user.email);
    if(  (this.errorNombre+this.errrorPassword+this.errorRePassrword+this.errorEmail)>0){
      return false;
    }
    return true;
  }

  verificarNombre(nombre:string):number {
    const patron=/^[a-zA-Z]{6,20}$/;
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!patron.test(nombre))
      return 3;
    return 0;
  }
  
  verificarPassword(password:any): number {
    const patron=/^[A-Z][a-zA-Za-z0-9]{6,20}$/;
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    if(!patron.test(password))
      return 3;
    return 0;
  }
  
  verificarRePassword(password:any, repassword:any): number {
    if(password!=repassword){
      return 1;
    }
    return 0;
  }
  
  verificarEmail(email:any): number {
    const patron=/^[a-z0-9]{1,10}@[a-z0-9]{1,10}\.[a-z]{2,3}/;
    if(email.length==0)
      return 1;
    if(email.length>20)
      return 2;
    if(!patron.test(email))
      return 3;
    return 0;
  }


  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.user.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarPassword() {
    if (this.errrorPassword > 0) {
      console.log("Limpiar password");
      this.user.password = "";
      this.errrorPassword = 0;
    }
  }

  limpiarRePassword() {
    if (this.errorRePassrword > 0) {
      console.log("Limpiar repassword");
      this.user.repassword = "";
      this.errorRePassrword = 0;
    }

  }

  limpiarEmail() {
    if(this.errorEmail>0){
      console.log("Limpiar email");
      this.user.email = "";
      this.errorEmail = 0;
    }
  }
}


