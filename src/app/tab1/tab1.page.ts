import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { RouterModule, Router } from '@angular/router';
import * as firebase from 'firebase'
import { ProfileActions } from 'src/redux/actions/profile_actions';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MasterActions } from 'src/redux/actions/master_actions';
import { AlertControllerService } from '../alert-controller.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @select(['profileData', 'profiledata'])
  readonly profiledata$: Observable<any>;

  @select(['masterData', 'masterdata'])
  readonly masterdata$: Observable<any>;

  public projectData:any;
  public profileImage:boolean=true;
  public myData:any;
  // public favo:boolean=true;
  public sendData:any;
  public totalData:any

  constructor(
    private router: Router, 
    public nav:NavController,
    public navCtrl:NavController,
    public profileActions:ProfileActions,
    public masterAction:MasterActions,
    public toastControl:AlertControllerService
    ){ 
    this.masterAction.fetchMaster();
    let sub = this.masterdata$.subscribe((res)=>{
      if(res){ 
        this.totalData=[];
        console.log(res);  
        this.totalData=res.entries;
        console.log(this.totalData);
      }
    });

  }
  mainData(){
    
  }

  goDetails(i){
    console.log(i);
    this.nav.navigateForward('/details/'+i);
  }

  addFav(data,i){
    if(data.fav == true){
      this.toastControl.openToast("you have alrady added to fav",1500);
    }else{
      data.fav = true;
      console.log("added fav"+data);
      firebase.database().ref(`/favorites/`).push(data).then(()=>{
        firebase.database().ref(`/entries/` +i+`/`).update({
          fav:true
        })
        this.toastControl.openToast("Added to fav",1500);
      });
    }
}
}

