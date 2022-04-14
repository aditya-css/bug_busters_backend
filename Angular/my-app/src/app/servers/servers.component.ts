import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '[app-servers]',
   selector:'app-servers',
    templateUrl: './servers.component.html',
 // template: `<app-server> </app-server>
  //<app-server> </app-server> `,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'no server created!';
  serverName = ''
  serverCreated = false;
  constructor() {
     setTimeout(() => {
        this.allowNewServer = true
     }, 2000)
   }

  ngOnInit(): void {
  }
  // create server method
  onCreateserver() {
    this.serverCreated = true;
     this.serverCreationStatus = 'server was created!' + this.serverName;
  }
  //update server method
  onUpdateServerName(event: Event) {
   this.serverName = (<HTMLInputElement>event.target).value
 
  }

}
