package uz.traffic.light.hackaton.model.simulation;

public record SimulationStats(
        int totalVehicles,
        double averageWaitTime,
        int throughput
) {
}
