package uz.traffic.light.hackaton.controller.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/demo")
public class DemoVideoController {
    @GetMapping
    public String demoPage(){
        return "demo";
    }
}
