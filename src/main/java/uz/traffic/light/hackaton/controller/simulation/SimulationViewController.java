package uz.traffic.light.hackaton.controller.simulation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/simulation")
public class SimulationViewController {

    @GetMapping
    public String simulationPage() {
        return "forward:/simulation/index.html";
    }
}
