<?php

namespace AppBundle\Controller;
use AppBundle\Entity\Invitation;
use FOS\RestBundle\Controller as FOSCtlr;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class InvitationController extends FOSCtlr\FOSRestController
{
    public function getInvitationAction($invitationId) {
        $invitation = $this->getDoctrine()
        ->getRepository('AppBundle:Invitation')
        ->find($invitationId);
        
        $result_data = (object)[];
        
        if (!$invitation) {
            $result_data = (object) [
                'status' => "error"
            ];
        }else{
            $result_data = (object) [
                'id' => $invitation->getId(),
                'senderName' => $invitation->getSenderName(),
                'invitedName' => $invitation->getInvitedName(),
                'message' => $invitation->getMessage(),
                'status' => $invitation->getStatus()
            ]; 
        }
        $result = json_encode($result_data);
        return new Response($result);
    }
    
    public function getallInvitationAction() {
        $entityManager = $this->getDoctrine()->getManager();
        $invitation = $this->getDoctrine()
        ->getRepository('AppBundle:Invitation')
        ->findAll();
        
        $result_data = (object)[];
        if (!$invitation) {
            $result_data = (object) [
                'status' => "error"
            ];
        }else{
            $max = sizeof($invitation);
            $array = [];
            for($i=0;$i<$max;$i++){
                $element = (object) [
                    'id' => $invitation[$i]->getId(),
                    'senderName' => $invitation[$i]->getSenderName(),
                    'invitedName' => $invitation[$i]->getInvitedName(),
                    'message' => $invitation[$i]->getMessage(),
                    'status' => $invitation[$i]->getStatus()
                ];
                array_push($array,$element);
            }
            $result_data = json_encode($array);
        }
        return new Response($result_data);
    }
    
    public function deleteInvitationAction($invitationId) {
        $entityManager = $this->getDoctrine()->getManager();        
        $invitation = $this->getDoctrine()
        ->getRepository('AppBundle:Invitation')
        ->find($invitationId);
        
        $result_data = (object)[];
        if (!$invitation) {
            $result_data = (object) [
                'status' => "error"
            ];
        }else{
            $result_query = $entityManager->remove($invitation);
            $entityManager->flush();
            $result_data = (object) [
                'status' => "success"
            ];
        }
        $result = json_encode($result_data);
        return new Response($result);
    }
    
    public function putInvitationStatusAction($invitationId, $status) {
        $entityManager = $this->getDoctrine()->getManager();
        $invitation = $this->getDoctrine()
        ->getRepository('AppBundle:Invitation')
        ->find($invitationId);
        
        $result_data = (object)[];
        if (!$invitation) {
            $result_data = (object) [
                'status' => "error"
            ];
        }else{
            $invitation->setStatus($status);
            $entityManager->flush();
            $result_data = (object) [
                'id' => $invitation->getId(),
                'senderName' => $invitation->getSenderName(),
                'invitedName' => $invitation->getInvitedName(),
                'message' => $invitation->getMessage(),
                'status' => $invitation->getStatus()
            ];
        }
        $result = json_encode($result_data);
        return new Response($result);
    }
    
    public function postInvitationAddAction(Request $request)
    {
        $invitation = new Invitation();
        
        $result_data = (object)[];
        if (!$request) {
            $result_data = (object) [
                'status' => "error"
            ];
        }else{
            
            $senderName = $request->query->get('sendername');
            $invitedName = $request->query->get('invitedname');
            $message = $request->query->get('message');
            $status = $request->query->get('status');
            
            $invitation->setSenderName($senderName);
            $invitation->setInvitedName($invitedName);
            $invitation->setMessage($message);
            $invitation->setStatus($status);
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($invitation);
            $entityManager->flush();
            $result_data = (object) [
                'status' => "success"
            ];
        }

        $result = json_encode($result_data);
        return new Response($result);
    }
    
}
