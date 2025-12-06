package uz.traffic.light.hackaton.service.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import uz.traffic.light.hackaton.config.ChatContextText;
import uz.traffic.light.hackaton.model.request.ChatRequest;
import uz.traffic.light.hackaton.model.response.ChatResponse;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatContextText chatContextText;
    private final ChatClient chatClient;

    public ChatResponse ask(ChatRequest request) {
        String context = chatContextText.getContext();
        String question = request.question();

        String sb = "Following text is the context that starts with ```НАЧАЛО``` and ends with ```КОНЕЦ```" +
                context +
                "You need to answer the following question based only on the context. " +
                "If the answer is not in the context, say that you are not able to answer it yet." +
                question;

        String response = chatClient.prompt(sb).call().content();
        return new ChatResponse(response);
    }
}
