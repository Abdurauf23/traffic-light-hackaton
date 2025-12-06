package uz.traffic.light.hackaton.controller.chat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/chat")
public class ChatUIController {

    @GetMapping
    public String chatPage(){
        return "chat";
    }
}
