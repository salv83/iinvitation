<?php

class getInvitationTest extends PHPUnit_Framework_TestCase
{
    private $http;
    
    public function setUp()
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:8000/']);
    }
    
    public function testGet()
    {
        $response = $this->http->request('GET', '/api/invitations/1');
        
        $this->assertEquals(200, $response->getStatusCode());
        
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        
    }
    
    public function testPost()
    {
        $response = $this->http->request('POST', '/api/invitations/adds?sendername=will&invitedname=bill&message=hello&status=2');
        
        $this->assertEquals(200, $response->getStatusCode());
        
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        
    }
    
    public function testPut()
    {
        $response = $this->http->request('PUT', '/api/invitations/8/statuses/7');
        
        $this->assertEquals(200, $response->getStatusCode());
        
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        
    }
    
    
    
    public function tearDown() {
        $this->http = null;
    }
}