package uz.traffic.light.hackaton.model.ml;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MLPredictResponse(
        String id,
        DirectionTimings north,
        DirectionTimings south,
        DirectionTimings east,
        DirectionTimings west
) {
    public record DirectionTimings(
            @JsonProperty("green") int green,
            @JsonProperty("red") int red
    ) {
    }
}
