package es.urjc.code.rest;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class PangSocketHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
        private Map <Integer,Integer> sala = new ConcurrentHashMap<>(); 
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
                int id2 = Integer.parseInt(session.getId());
                int id1=-1;
                ObjectNode ready = mapper.createObjectNode();
                ready.put("isready", "1");
                
                for(int participant : sala.keySet()) {
			if( id1==-1 && sala.get(participant) ==0){
                            sala.replace(participant,id2);
                            sala.put(id2, participant);
                            id1 = participant;
                            System.out.println("Salas emparejadas: " + session.getId() + ", " + id1);
                            Thread.sleep(10000);
                            System.out.println("Message sent: " + ready.toString());
                            session.sendMessage(new TextMessage(ready.toString()));
                            sessions.get(Integer.toString(id1)).sendMessage(new TextMessage(ready.toString()));
                        }
		}
                if(id1==-1){
                    sala.put(id2,0);
                }
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
                int id = Integer.parseInt(session.getId());
                sala.remove(id);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		int id = Integer.parseInt(session.getId());
		sendOtherParticipants(session, node,id);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node, int id) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
                ObjectNode positionNode = mapper.createObjectNode();
                
                positionNode.put("x", node.get("position").get("x").asText());
                positionNode.put("y", node.get("position").get("y").asText());
		newNode.put("position", positionNode.asText());
		newNode.put("isShooting", node.get("isShooting").asText());
		newNode.put("powerUp", node.get("powerUp").asText());
		newNode.put("animation", node.get("animation").asText());
		
		for(WebSocketSession participant : sessions.values()) {
			if(participant.getId().equals(sala.get(id).toString()) && participant != session) {
				participant.sendMessage(new TextMessage(node.toString()));
			}
		}
	}

}
