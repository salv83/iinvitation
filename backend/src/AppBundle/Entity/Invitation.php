<?php

namespace AppBundle\Entity;

/**
 * Invitation
 */
class Invitation
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $senderName;

    /**
     * @var string
     */
    private $invitedName;

    /**
     * @var string
     */
    private $message;

    /**
     * @var string
     */
    private $status;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set senderName
     *
     * @param string $senderName
     *
     * @return Invitation
     */
    public function setSenderName($senderName)
    {
        $this->senderName = $senderName;

        return $this;
    }

    /**
     * Get senderName
     *
     * @return string
     */
    public function getSenderName()
    {
        return $this->senderName;
    }

    /**
     * Set invitedName
     *
     * @param string $invitedName
     *
     * @return Invitation
     */
    public function setInvitedName($invitedName)
    {
        $this->invitedName = $invitedName;

        return $this;
    }

    /**
     * Get invitedName
     *
     * @return string
     */
    public function getInvitedName()
    {
        return $this->invitedName;
    }

    /**
     * Set message
     *
     * @param string $message
     *
     * @return Invitation
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     *
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Set status
     *
     * @param string $status
     *
     * @return Invitation
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }
}

