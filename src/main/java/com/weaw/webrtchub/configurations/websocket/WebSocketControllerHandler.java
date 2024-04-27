package com.weaw.webrtchub.configurations.websocket;

import com.weaw.webrtchub.models.WebSocketMessage;
import com.weaw.webrtchub.utils.annotations.WebSocketController;
import com.weaw.webrtchub.utils.annotations.methods.DELETE;
import com.weaw.webrtchub.utils.annotations.methods.GET;
import com.weaw.webrtchub.utils.annotations.methods.POST;
import com.weaw.webrtchub.utils.annotations.methods.PUT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

public class WebSocketControllerHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketControllerHandler.class);

    private final ApplicationContext applicationContext;

    private final Map<String, Object> webSocketClassInstance = new HashMap<>();

    private final Map<String, Method> webSocketEndpointMap = new HashMap<>();

    public WebSocketControllerHandler(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
        LOGGER.info("Configure WebSocket Controller");
        Map<String, Object> beansWithAnnotation = applicationContext.getBeansWithAnnotation(WebSocketController.class);
        for (Object bean : beansWithAnnotation.values()) {
            processClass(bean);
        }

        StringBuilder paths = new StringBuilder();
        for (String path : webSocketEndpointMap.keySet()) {
            paths.append(path).append(",");
        }
        paths.deleteCharAt(paths.length() - 1);
        LOGGER.info("Websocket path found : {}", paths);

    }

    private void processClass(Object bean) {
        for (Method method : bean.getClass().getDeclaredMethods()) {
            WebSocketController webSocketController = bean.getClass().getAnnotation(WebSocketController.class);
            if (method.isAnnotationPresent(GET.class)) {
                GET getAnnotation = method.getAnnotation(GET.class);
                String classPath = webSocketController.path();
                String endpointPath = getAnnotation.path();
                String path = createPath("get",classPath,endpointPath);
                webSocketClassInstance.put(path, bean);
                webSocketEndpointMap.put(path, method);
            }
            if (method.isAnnotationPresent(POST.class)) {
                POST getAnnotation = method.getAnnotation(POST.class);
                String classPath = webSocketController.path();
                String endpointPath = getAnnotation.path();
                String path = createPath("post",classPath,endpointPath);
                webSocketClassInstance.put(path, bean);
                webSocketEndpointMap.put(path, method);
            }
            if (method.isAnnotationPresent(PUT.class)) {
                PUT getAnnotation = method.getAnnotation(PUT.class);
                String classPath = webSocketController.path();
                String endpointPath = getAnnotation.path();
                String path = createPath("put",classPath,endpointPath);
                webSocketClassInstance.put(path, bean);
                webSocketEndpointMap.put(path, method);
            }
            if (method.isAnnotationPresent(DELETE.class)) {
                DELETE getAnnotation = method.getAnnotation(DELETE.class);
                String classPath = webSocketController.path();
                String endpointPath = getAnnotation.path();
                String path = createPath("delete",classPath,endpointPath);
                webSocketClassInstance.put(path, bean);
                webSocketEndpointMap.put(path, method);
            }
        }
    }

    private String createPath(String method, String classPath, String endpointPath) {
        if(endpointPath.startsWith("/")) {
            endpointPath = endpointPath.substring(1);
        }
        if(endpointPath.endsWith("/")) {
            endpointPath = endpointPath.substring(0, endpointPath.length()-1);
        }
        if(classPath.startsWith("/")) {
            classPath = classPath.substring(1);
        }
        if(classPath.endsWith("/")) {
            classPath = classPath.substring(0, classPath.length()-1);
        }
        return method + ":" + classPath + "/" + endpointPath;
    }

    public WebSocketMessage processWebSocketMessage(WebSocketMessage message){
        if(this.webSocketEndpointMap.containsKey(message.getPath())){
            Method method = this.webSocketEndpointMap.get(message.getPath());
            Object bean = this.webSocketClassInstance.get(message.getPath());
            try {
                invoke(method,bean,message.getPayload());
            } catch (IllegalAccessException e) {
                System.out.println(e);
                throw new RuntimeException(e);
            } catch (InvocationTargetException e) {
                System.out.println(e);
                throw new RuntimeException(e);
            }
        }else {

        }
        return message;
    }

    private void invoke(Method method, Object bean, Map<String,Object> parameters) throws IllegalAccessException, InvocationTargetException {
        Class<?>[] parameterTypes = method.getParameterTypes();
        Parameter[] methodParameters = method.getParameters();

        if (methodParameters.length != parameters.size()) {
            throw new IllegalArgumentException("Nombre de paramètres incorrect pour la méthode");
        }

        Object[] args = new Object[methodParameters.length];

        for(int i = 0; i < methodParameters.length; i++) {
            String name = methodParameters[i].getName();
            Class<?> expectedType = parameterTypes[i];

            AtomicBoolean findParam = new AtomicBoolean(false);
            int finalI = i;
            parameters.forEach((key, value) -> {
                if(expectedType.isPrimitive()){
                    if (expectedType == int.class && value instanceof Integer v) {
                        args[finalI] = v;
                    }
                    if (expectedType == long.class && value instanceof Long v) {
                        args[finalI] = v;
                    }
                    if (expectedType == double.class && value instanceof Double v) {
                        args[finalI] = v;
                    }
                }else{
                    if(expectedType.isAssignableFrom(value.getClass()) && name.equals(key)) {
                        findParam.set(true);
                        args[finalI] = value;
                    }
                }


            });
            if(!findParam.get()) {

            }
        }
        method.invoke(bean, args);
    }

}
