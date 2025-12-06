package uz.traffic.light.hackaton.config;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
@ConfigurationProperties(prefix = "chat.context")
public class ChatContextText {
    @Setter
    @Getter
    private Resource text;
    @Getter
    @Setter
    private String context;

    @PostConstruct
    void init() throws IOException {
        context = new String(text.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
