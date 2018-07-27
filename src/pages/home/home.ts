import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    items: any = [];
    itemExpandHeight: number = 100;
    tournament: any;
    events: any = [];
    expandedEvents: any = [];
 
    constructor(public navCtrl: NavController, private storage: Storage, public restProvider: RestProvider) {
        this.storage.get('activeTournament').then((val) => {
            this.tournament = val;
        });

        this.restProvider.getHomepageEvents(1,1).then(res => {
          this.events = res;
          console.log(this.events);

          for (let i=0; i<this.events.length; i++) {
              this.expandedEvents.push({
                  event: this.events[i],
                  expanded: false,
              })
          }
          this.expandedEvents[0].expanded = true;
        });
    }
 
    expandItem(item){
        this.expandedEvents.map((listItem) => {
 
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
    }

}
