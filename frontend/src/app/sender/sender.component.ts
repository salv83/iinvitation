import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invitation } from '../model/invitation';
import { InvitationService } from '../service/invitation.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {

  senderValue: string = '';
  valueSearch: string = '';
  invitations: Invitation[];
  invitation: Invitation;
  active: Invitation;
  selectedInvitation: Invitation;
  showerrmsg: string;
  invitationstring: string = '';
  searchresults = [];
  searchOK: boolean = false;
  invitedName: string;
  message: string;

  constructor(private invitationservice: InvitationService) { }

  senderAreaEmpty() {
    if (this.senderValue != '') {
      return this.senderValue.length;
    }
  }

  search() {
    if (this.invitations) {
      this.searchresults = [];
      var arraylenght = this.invitations.length;
      var i: number;
      for (i = 0; i < arraylenght; i++) {
        if (
          (this.invitations[i]['senderName'].indexOf(this.valueSearch)) > 0 ||
          (this.invitations[i]['invitedName'].indexOf(this.valueSearch)) > 0 ||
          (this.invitations[i]['message'].indexOf(this.valueSearch)) > 0
        ) {
          this.searchresults.push(this.invitations[i]);
        }
      }
      this.searchOK = true;
    }

  }

  getAll() {
    this.invitationservice.getAll()
      .subscribe(data => {
        this.invitations = data;
      }, error => this.showerrmsg = error
      );
  }

  save(form: NgForm) {
    this.add(form.value);
    form.reset();
  }
  
  add(invitation) {
      this.invitationservice.postInvitation(this.senderValue, this.invitedName, this.message, "1" )
      .subscribe(data => {
        this.invitations = data;
        setInterval(() => { this.refresh(); }, 1000);
      }, error => this.showerrmsg = error
      );
  }

  delete(event, invitation: Invitation) {
    /* It's called when the Invited delete the Invitation, 
    status 2 means deleted by the sender */
    this.invitationservice.putInvitation(invitation.id, '2')
      .subscribe(data => {
        setInterval(() => { this.refresh(); }, 1000);
      }, error => this.showerrmsg = error
      );
  }

  statusDisplay(status: String){
    var result='';
    if(status==='0') {result='Accpted';}
    if(status==='1') {result='Declined';}
    if(status==='2') {result='Deleted';}
    return result;
 }
 
  toString(invitation: Invitation) {
    this.invitationstring = JSON.stringify(invitation);
    return this.invitationstring;
  }

  setActive(invitation: Invitation) {
    this.active = invitation;

  }

  refresh() {
    window.location.reload();
  }

  ngOnInit() {
    this.getAll();
  }

}
