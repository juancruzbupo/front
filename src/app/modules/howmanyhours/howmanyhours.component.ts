import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Session } from '../../services/session';
import { Client } from '../../services/api';
import { LoginReferrerService } from '../../services/login-referrer.service';

@Component({
  selector: 'm-howmanyhours',
  templateUrl: 'howmanyhours.component.html'
})

export class HowmanyhoursComponent {
  minds = window.Minds;

  seconds: string = '0';
  videoError: boolean = false;

  constructor(public session: Session, public client: Client) {
  }

  ngOnInit() {
    if (!this.session.isLoggedIn()) {
      return this.router.navigate(['/login']);
    }
    
    this.get();
  }

  get() {
    this.client.get('api/v2/howmanyhours')
      .then((response: any) => {
        if (response && response.seconds) {
            this.seconds = this.secondsToHms(response.seconds);
        }
      });
  }

  onSourceError() {
    this.videoError = true;
  }

  secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? "hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;
  }

}
