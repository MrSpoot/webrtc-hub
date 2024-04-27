package com.weaw.webrtchub.controllers.v1.websockets;

import com.weaw.webrtchub.utils.annotations.WebSocketController;
import com.weaw.webrtchub.utils.annotations.methods.GET;
import com.weaw.webrtchub.utils.annotations.methods.POST;

@WebSocketController(path = "test")
public class TestController {


    @GET
    public void testGet(String test, int number){
        System.out.println("JE SUIS DANS LA BONNE METHOD : "+test+" Number : "+number);
    }

    @POST(path = "/api/test")
    public void testPost(){

    }

}
