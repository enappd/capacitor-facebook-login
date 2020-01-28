import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logininfo: any;
  user: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.userinfo) {
        this.logininfo = JSON.parse(params.userinfo);
      }
    });
  }
  ionViewWillEnter() {
    this.getUserInfo();
  }

  async signOut(): Promise<void> {
    await Plugins.FacebookLogin.logout();
    this.router.navigate(['/login']);
  }

  async getUserInfo() {
    const response = await fetch(`https://graph.facebook.com/${this.logininfo.userId}?fields=id,name,gender,link,picture&type=large&access_token=${this.logininfo.token}`);
    const myJson = await response.json();
    console.log('myjson', myJson);
    this.user = myJson
  }

}
