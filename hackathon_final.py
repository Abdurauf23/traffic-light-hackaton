#!/usr/bin/env python3
from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

STATE_MAP = {"none": -1, "red": 0, "green": 1}

# Load model once
bundle = joblib.load("model.joblib")
MODEL = bundle["model"]
FEATURE_COLUMNS = bundle["feature_columns"]

def predict_intersection_cycle(model, feature_columns, *,
                               time_of_day, day_of_week,
                               congestion_north, congestion_south, congestion_east, congestion_west,
                               speed_north=60, lanes_north=3, lanes_south=3, lanes_east=2, lanes_west=2,
                               has_opposite=1, has_left=1, has_right=1,
                               current_state_north="red", time_in_current_state_north=30,
                               current_state_south="green", time_in_current_state_south=45,
                               current_state_east="red", time_in_current_state_east=10,
                               current_state_west="red", time_in_current_state_west=10,
                               cycle=60):

    row = {
        "time_of_day": time_of_day,
        "day_of_week": day_of_week,
        "congestion_north": congestion_north,
        "congestion_south": congestion_south,
        "congestion_east": congestion_east,
        "congestion_west": congestion_west,
        "speed_north": speed_north,
        "lanes_north": lanes_north,
        "lanes_south": lanes_south,
        "lanes_east": lanes_east,
        "lanes_west": lanes_west,
        "has_opposite": has_opposite,
        "has_left": has_left,
        "has_right": has_right,
        "current_state_north": STATE_MAP.get(current_state_north, -1),
        "time_in_current_state_north": time_in_current_state_north,
        "current_state_south": STATE_MAP.get(current_state_south, -1),
        "time_in_current_state_south": time_in_current_state_south,
        "current_state_east": STATE_MAP.get(current_state_east, -1),
        "time_in_current_state_east": time_in_current_state_east,
        "current_state_west": STATE_MAP.get(current_state_west, -1),
        "time_in_current_state_west": time_in_current_state_west,
    }

    df = pd.DataFrame([row])[feature_columns]
    pred_ns = float(model.predict(df)[0])

    green_ns = max(round(pred_ns), 15)
    green_ns = min(green_ns, cycle - 15)

    green_ew_total = cycle - green_ns

    if has_left and has_right:
        green_ew_each = green_ew_total / 2
    elif has_left or has_right:
        green_ew_each = green_ew_total
    else:
        green_ew_each = 0

    green_ew_each = round(green_ew_each, 1)
    green_ns = int(green_ns)

    return {
        "green": {
            "north": green_ns if has_opposite else 0,
            "south": green_ns,
            "east": green_ew_each if has_right else 0,
            "west": green_ew_each if has_left else 0,
        },
        "red": {
            "north": cycle - green_ns if has_opposite else cycle,
            "south": cycle - green_ns,
            "east": cycle - green_ew_each if has_right else cycle,
            "west": cycle - green_ew_each if has_left else cycle,
        },
        "cycle": cycle,
        "raw_pred_ns": pred_ns
    }

@app.route("/predict", methods=["GET"])
def predict():
    try:
        args = request.args

        light_id = args.get("id", "TL_001")
        time_of_day = int(args.get("time_of_day", 8))
        day_of_week = int(args.get("day_of_week", 4))

        cong_n = int(args.get("congestion_north", 7))
        cong_s = int(args.get("congestion_south", 9))
        cong_e = int(args.get("congestion_east", 3))
        cong_w = int(args.get("congestion_west", 4))

        speed_north = int(args.get("speed_north", 60))
        lanes_north = int(args.get("lanes_north", 3))
        lanes_south = int(args.get("lanes_south", 3))
        lanes_east = int(args.get("lanes_east", 2))
        lanes_west = int(args.get("lanes_west", 2))

        has_opposite = int(args.get("has_opposite", 1))
        has_left = int(args.get("has_left", 1))
        has_right = int(args.get("has_right", 1))

        current_state_north = args.get("current_state_north", "red")
        current_state_south = args.get("current_state_south", "green")
        current_state_east = args.get("current_state_east", "red")
        current_state_west = args.get("current_state_west", "red")

        time_state_north = int(args.get("time_in_state_north", 30))
        time_state_south = int(args.get("time_in_state_south", 45))
        time_state_east = int(args.get("time_in_state_east", 10))
        time_state_west = int(args.get("time_in_state_west", 10))

        cycle = int(args.get("cycle", 60))

        result = predict_intersection_cycle(
            MODEL, FEATURE_COLUMNS,
            time_of_day=time_of_day,
            day_of_week=day_of_week,
            congestion_north=cong_n,
            congestion_south=cong_s,
            congestion_east=cong_e,
            congestion_west=cong_w,
            speed_north=speed_north,
            lanes_north=lanes_north,
            lanes_south=lanes_south,
            lanes_east=lanes_east,
            lanes_west=lanes_west,
            has_opposite=has_opposite,
            has_left=has_left,
            has_right=has_right,
            current_state_north=current_state_north,
            time_in_current_state_north=time_state_north,
            current_state_south=current_state_south,
            time_in_current_state_south=time_state_south,
            current_state_east=current_state_east,
            time_in_current_state_east=time_state_east,
            current_state_west=current_state_west,
            time_in_current_state_west=time_state_west,
            cycle=cycle,
        )

        output = {
            "id": light_id,
            "north": {"green": result["green"]["north"], "red": result["red"]["north"]},
            "south": {"green": result["green"]["south"], "red": result["red"]["south"]},
            "east": {"green": result["green"]["east"], "red": result["red"]["east"]},
            "west": {"green": result["green"]["west"], "red": result["red"]["west"]},
        }

        return jsonify(output)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
