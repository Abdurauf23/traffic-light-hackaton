package uz.traffic.light.hackaton.controller.simulation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.traffic.light.hackaton.model.simulation.TrafficUpdateRequest;
import uz.traffic.light.hackaton.model.simulation.TrafficUpdateResponse;
import uz.traffic.light.hackaton.service.simulation.SimulationService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TrafficUpdateController {

    private final SimulationService simulationService;

    @PostMapping("/traffic-update")
    public ResponseEntity<TrafficUpdateResponse> updateTraffic(@RequestBody TrafficUpdateRequest request) {
        TrafficUpdateResponse response = simulationService.calculateOptimalTimings(request);
        return ResponseEntity.ok(response);
    }
}
