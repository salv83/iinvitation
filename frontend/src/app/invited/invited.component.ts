import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Invitation } from '../model/invitation';
import { InvitationService } from '../service/invitation.service';


@Component({
  selector: 'app-invited',
  templateUrl: './invited.component.html',
  styleUrls: ['./invited.component.css']
})

export class InvitedComponent implements OnInit {
  @Input() id: number;
  @Input() status: string;
  invitedValue: string = '';
  valueSearch: string = '';
  invitations: Invitation[];
  invitation: Invitation;
  active: Invitation;
  selectedInvitation: Invitation;
  showerrmsg: string;
  invitationstring: string = '';
  searchresults = [];
  searchOK: boolean = false;
  senderName: string;
  message: string;

  constructor(private invitationservice: InvitationService) { }

  invitedAreaEmpty() {
    if (this.invitedValue != '') {
      return this.invitedValue.length;
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

  edit(event, invitation: Invitation) {
    /* It's called when the Invited accept the Invitation, 
    status 1 means accepted by the Invited */
    this.invitationservice.putInvitation(invitation.id, '1')
      .subscribe(data => {
        setInterval(() => { this.refresh(); }, 1000);
      }, error => this.showerrmsg = error
      );
  }

  delete(event, invitation: Invitation) {
    /* It's called when the Invited delete the Invitation, 
    status 0 means declined by the Invited */
    this.invitationservice.putInvitation(invitation.id, '0')
      .subscribe(data => {
        setInterval(() => { this.refresh(); }, 1000);
      }, error => this.showerrmsg = error
      );
  }
  toString(invitation: Invitation) {
    this.invitationstring = JSON.stringify(invitation);
    return this.invitationstring;
  }

  setActive(invitation: Invitation) {
    this.active = invitation;

  }

  statusDisplay(status: String){
     var result='';
     if(status==='0') {result='Accpted';}
     if(status==='1') {result='Declined';}
     if(status==='2') {result='Deleted';}
     return result;
  }

  refresh() {
    window.location.reload();
  }

  ngOnInit() {
    this.getAll();
  }


}
