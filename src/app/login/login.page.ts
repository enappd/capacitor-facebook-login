import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getCurrentState();
  }
  async getCurrentState() {
    const result = await Plugins.FacebookLogin.getCurrentAccessToken();

    try {
      console.log(result);
      if (result && result.accessToken) {
        console.info('token', result.accessToken);
        let user = { token: result.accessToken.token, userId: result.accessToken.userId }
        let navigationExtras: NavigationExtras = {
          queryParams: {
            userinfo: JSON.stringify(user)
          }
        };
        this.router.navigate(["/home"], navigationExtras);
      }
    } catch (e) {
      console.log(e)
    }
  }

  async signIn(): Promise<void> {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];

    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    console.info('result 1', result);
    if (result && result.accessToken) {
      console.info('token 1', result.accessToken);
      let user = { token: result.accessToken.token, userId: result.accessToken.userId }
      let navigationExtras: NavigationExtras = {
        queryParams: {
          userinfo: JSON.stringify(user)
        }
      };
      this.router.navigate(["/home"], navigationExtras);
    }

  }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
  }
}
