package uz.traffic.light.hackaton;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import uz.traffic.light.hackaton.config.ChatContextText;

@SpringBootApplication
@EnableConfigurationProperties(ChatContextText.class)
public class TrafficLightHackatonApplication {
    public static void main(String[] args) {
        SpringApplication.run(TrafficLightHackatonApplication.class, args);
    }
}
