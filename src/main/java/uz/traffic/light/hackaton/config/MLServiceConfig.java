package uz.traffic.light.hackaton.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Setter
@Getter
@Configuration("myMLbean")
@ConfigurationProperties(prefix = "ml.python.service")
public class MLServiceConfig {

    private String url;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
