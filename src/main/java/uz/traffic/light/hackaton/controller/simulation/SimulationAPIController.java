package uz.traffic.light.hackaton.controller.simulation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.traffic.light.hackaton.model.simulation.SimulationStats;
import uz.traffic.light.hackaton.model.simulation.SimulationStatus;
import uz.traffic.light.hackaton.service.simulation.SimulationService;

@RestController
@RequestMapping("/api/simulation")
@RequiredArgsConstructor
public class SimulationAPIController {

    private final SimulationService simulationService;

    @GetMapping("/status")
    public ResponseEntity<SimulationStatus> getStatus() {
        boolean running = simulationService.isRunning();
        return ResponseEntity.ok(new SimulationStatus(
                running,
                running ? "Simulation is running" : "Simulation is stopped"
        ));
    }

    @PostMapping("/start")
    public ResponseEntity<SimulationStatus> start() {
        simulationService.start();
        return ResponseEntity.ok(new SimulationStatus(true, "Simulation started"));
    }

    @PostMapping("/stop")
    public ResponseEntity<SimulationStatus> stop() {
        simulationService.stop();
        return ResponseEntity.ok(new SimulationStatus(false, "Simulation stopped"));
    }

    @PostMapping("/optimize")
    public ResponseEntity<Void> optimize() {
        simulationService.optimize();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<SimulationStats> getStats() {
        return ResponseEntity.ok(simulationService.getStats());
    }
}
