package uz.traffic.light.hackaton.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.IOException;
import java.util.Collections;
import java.util.Enumeration;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        ContentCachingRequestWrapper wrappedRequest =
                new ContentCachingRequestWrapper(request);

        long start = System.currentTimeMillis();

        filterChain.doFilter(wrappedRequest, response);

        long duration = System.currentTimeMillis() - start;

        String method = wrappedRequest.getMethod();
        String uri = wrappedRequest.getRequestURI();
        String query = wrappedRequest.getQueryString();
        String realIp = wrappedRequest.getHeader("X-Real-IP");
        String forwardedFor = wrappedRequest.getHeader("X-Forwarded-For");

        // Основная строка логов
        logger.info(String.format(
                "HTTP %s %s %s | realIp=%s | xff=%s | duration=%dms",
                method,
                uri,
                query != null ? "?" + query : "",
                realIp,
                forwardedFor,
                duration
        ));

        // Логи всех хедеров
        Enumeration<String> headerNames = wrappedRequest.getHeaderNames();
        if (headerNames != null) {
            StringBuilder headers = new StringBuilder();
            for (String name : Collections.list(headerNames)) {
                headers.append(name)
                        .append("=")
                        .append(wrappedRequest.getHeader(name))
                        .append("; ");
            }
            logger.info(String.format("Headers: %s", headers));
        }

        // Лог тела запроса (если есть)
        byte[] bodyBytes = wrappedRequest.getContentAsByteArray();
        if (bodyBytes.length > 0) {
            String body = new String(bodyBytes);
            logger.info(String.format("Body: %s", body));
        }
    }
}
