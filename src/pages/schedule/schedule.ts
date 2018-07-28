import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';


@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {

    itemExpandHeight: number = 100;
    schedule: any = [];
    expandedSchedule: any = [];
    days: any = [];
 
    constructor(public navCtrl: NavController, public restProvider: RestProvider, private storage: Storage) {
        this.storage.get('activeTournament').then((val) => {
            this.restProvider.getSchedule(val.id).then(res => {
                this.expandSchedule(res);
            });
        });
    }

    expandSchedule(schedule) {
      this.schedule = schedule;
      for (let i=0; i<this.schedule.length; i++) {
        let day = this.schedule[i].event.date_start.substring(0,10);
        if (!this.days.includes(day)) {
            this.days.push(day);
        }
      }
      for (let i=0; i<this.days.length; i++) {
          let aux = [];
          for (let j=0; j<this.schedule.length; j++) {
              if (this.schedule[j].event.date_start.includes(this.days[i])) {
                  aux.push({
                      detail: this.schedule[j],
                      expanded: false,
                  })
              }
          }
          this.expandedSchedule.push({
              date: this.days[i],
              events: aux,
          });
        }
    }
 
    expandItem(item) {
        this.expandedSchedule.map((day) => {
            day.events.map((listItem) => {
                if(item == listItem){
                listItem.expanded = !listItem.expanded;
                } else {
                    listItem.expanded = false;
                }
     
                return listItem;
            })
        })
    }



    ionViewDidLoad() {
    	console.log('ionViewDidLoad SchedulePage');
  	}

}
