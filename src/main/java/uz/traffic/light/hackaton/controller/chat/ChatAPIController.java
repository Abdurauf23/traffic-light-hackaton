package uz.traffic.light.hackaton.controller.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.traffic.light.hackaton.model.request.ChatRequest;
import uz.traffic.light.hackaton.model.response.ChatResponse;
import uz.traffic.light.hackaton.service.chat.ChatService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ask")
public class ChatAPIController {
    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> ask(
            @RequestBody ChatRequest request){
        return ResponseEntity.ok(chatService.ask(request));
    }
}
