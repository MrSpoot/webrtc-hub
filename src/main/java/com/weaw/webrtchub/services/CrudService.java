package com.weaw.webrtchub.services;

import com.weaw.webrtchub.models.payloads.CrudPayload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

@Service
public class CrudService {

    public void process(CrudPayload payload) {
        switch (payload.getMethod()){
            case GET -> processGet(payload);
            case POST -> processPost(payload);
            case PUT -> processPut(payload);
            case DELETE -> processDelete(payload);
        }
    }

    private void processGet(CrudPayload payload) {

    }

    private void processPost(CrudPayload payload) {

    }

    private void processPut(CrudPayload payload) {

    }

    private void processDelete(CrudPayload payload) {

    }

}
