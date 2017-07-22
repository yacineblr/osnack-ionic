import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

// import { AngularFireAuth } from "angularfire2/auth";

// import * as firebase from 'firebase';

// import { HomePage } from './../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  public sinchClient: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  // private afAuth: AngularFireAuth,
  public alertCtrl: AlertController) {

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    /*
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // navCtrl.push(HomePage);
        console.log('recaptchaVerifier - callback: ', response);
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
        console.log('recaptchaVerifier - expired-callback: ');
      }
    });*/

    // console.log('SinchClient: ', SinchClient);
  }

  public sendVerificationCode() {
    this.sinchSendVerificationCode();
  }


  private firebaseSendVerificationCode() {
    firebase.auth().signInWithPhoneNumber('+33615670267', this.recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      console.log('confirmationResult: ', confirmationResult);

      let prompt = this.alertCtrl.create({
        title: 'Login',
        message: "Enter verification code",
        inputs: [
          {
            name: 'code',
            placeholder: 'Code'
          },
        ],
        buttons: [
          // {
          //   text: 'Cancel',
          //   handler: data => {
          //     console.log('Cancel clicked');
          //   }
          // },
          {
            text: 'Send',
            handler: (res: {code: string}) => {
              console.log('User Send code: ', res.code);
              confirmationResult.confirm(res.code).then((result) => {
                // User signed in successfully.
                console.log('Result: ', result);
                // ...
              }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
              });
            }
          }
        ]
      });
      prompt.present();


    }).catch(function (error) {
      // Error; SMS not sent
      console.log('Err sendVerificationCode(): ', error);
    });
  }

  private sinchSendVerificationCode() {

  }



}
