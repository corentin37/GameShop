import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router, private formBuilder: FormBuilder) {}
  utilisateur ;
  connectMessage;
  login;

  urlCGV = 'https://www.solutec.fr/en/legal-information/';
  
  fenetreInscription = false;
  fenetreMonProfil= false;
  fenetreConnexion = false;
/*import*/
  registerForm: FormGroup;
  submitted = false;
/*import*/
  ngOnInit(): void {
    
    this.userConnected();
/*import*/
    this.registerForm = this.formBuilder.group({
      
      login: ['', Validators.required],
      tel: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
/*import*/

  }

  goToLink(url: string){
    window.open(url, "_blank");
}

  connexion(user): any {
    this.http.post('http://localhost:8086/connect', user).subscribe({
      next: (data) => {
        console.log(data);
        this.utilisateur = data;
        console.log('u: ' + this.utilisateur);
        if (this.utilisateur != null) {
          this.connectMessage = 'Connecté';
          localStorage.setItem("password", this.utilisateur.password);
          localStorage.setItem('id', this.utilisateur.id);
          localStorage.setItem('login', this.utilisateur.login);
          localStorage.setItem('mail', this.utilisateur.mail);
          localStorage.setItem('tel', this.utilisateur.tel);
          localStorage.setItem('activity', this.utilisateur.activity);
          this.login = localStorage.getItem('login');
          console.log('name:' + this.login);
          console.log('enregistrement réussi');
          this.userConnected();

          
        } else {
          this.connectMessage = 'Identifiant ou mot de passe incorrect.';
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userConnected(): any{
    console.log("avant if")
    if(localStorage.getItem( "id") != null )
      {
        this.fenetreActivation(2);
        
      } else {
          this.fenetreActivation(0);
          
      }
    
    
    
  }
  //Cette fonction gere l'affichage des differentes div du html
  fenetreActivation(chiffre): any {
    this.fenetreInscription = false;
    this.fenetreConnexion = false;

    switch (chiffre) {
      case 0: {
        // Connexion
        this.fenetreInscription = false;
        this.fenetreMonProfil = false;
        this.fenetreConnexion = true;
        break;
      }

      case 1: {
        // Inscription
        this.fenetreInscription = true;
        this.fenetreMonProfil = false;
        this.fenetreConnexion = false;
        break;
      }

      case 2: {
        // mon profil
        this.fenetreMonProfil = true;
        this.fenetreInscription = false;
        this.fenetreConnexion = false;
        break;
      }

    }
  }

  console(entreeConsole): any {
    console.log('retour:' + entreeConsole);
  }

  inscription(user): any{
    // le formulaire s'appelle user, mais creation de joueur
    // ATTENTION A L'URL
  console.log(user)
  this.http.post('http://localhost:8086/joueur/save', user).subscribe({
  next: (data) => {this.fenetreActivation(0); alert("L'équipe Gameshop vous remercie de votre confiance") },
  error : (err) => { console.log(err); }

    });
  }

  /*import*/
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      this.inscription(this.registerForm.value);
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
  /*import*/

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }


}}
