1. Back end section:
Write a REST API based invitation system that allows for the following actions:
- One user aka the Sender can send an invitation to another user aka the Invited.
- The Sender can cancel a sent invitation.
- The Invited can either accept or decline an invitation.
- The Sender can see a list of all invitations they have sent.
- The Invited can see a list of all invitations they have received.
All endpoint responses must be in JSON.
The project must include tests written in the PHPUnit framework to demonstrate how the
various API endpoints behave in relation to each other. Complete the project using Symfony3.

2. Client section:
Use any front end framework to implement functional pages which are connected to the
back end APIs you have created.
The front end should show:
- A list of all invitations a user has sent. Each invitation should show a status which is
either “accepted” or “cancelled”
- A list of all invitations a user has received. Each invitation should have the functionality
to either “delete” or “accept”
- A search functionality so that users can search for certain invitations in the front end 
 
 ------------------------------------
 
 Symphony bundles used on the backend system
  
 ```
 friendsofsymfony/rest-bundle
 jms/serializer-bundle
 nelmio/cors-bundle
 
 phpunit/phpunit
 guzzlehttp/guzzle
 ```
 ------------------------------------
 
 Endpoints
 
 ```
 -------------------------- -------- -------- ------ ---------------------------------------------------
  Name                       Method   Scheme   Host   Path
 -------------------------- -------- -------- ------ ---------------------------------------------------
  getall_invitation          GET      ANY      ANY    /api/invitations/getall
  get_invitation             GET      ANY      ANY    /api/invitations/{invitationId}
  delete_invitation          DELETE   ANY      ANY    /api/invitations/{invitationId}
  put_invitation_status      PUT      ANY      ANY    /api/invitations/{invitationId}/statuses/{status}
  post_invitation_add        POST     ANY      ANY    /api/invitations/adds
 -------------------------- -------- -------- ------ ---------------------------------------------------
```

Screenshot of the Client
https://github.com/salv83/invitation/issues/1
