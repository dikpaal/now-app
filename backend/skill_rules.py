SKILL_RULES = {
    "elbow_lever": {
        "angles_to_check": [
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 80, "max": 100},
            {"name": "Forearm to Ground", "points": ["LEFT_ELBOW", "LEFT_WRIST", "LEFT_SHOULDER"], "min": 0, "max": 20},
            {"name": "Body Lean", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 160, "max": 180},
            {"name": "Leg Position", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 160, "max": 180},
        ]
    },
    "planche_lean": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 30, "max": 80},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 170, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 170, "max": 180},
        ]
    },
    "tuck_planche": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 30, "max": 60},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 45, "max": 70},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 30, "max": 60},
        ]
    },
    "advanced_tuck_planche": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 45, "max": 70},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 85, "max": 100},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 85, "max": 95},
        ]
    },
    "straddle_planche": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 45, "max": 70},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 175, "max": 180},
            {"name": "Leg Abduction", "points": ["RIGHT_KNEE", "MID_HIP", "LEFT_KNEE"], "min": 45, "max": 90},
        ]
    },
    "full_planche": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 50, "max": 80},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 175, "max": 180},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 175, "max": 180},
        ]
    },
    "tuck_front_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 80, "max": 100},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 30, "max": 60},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 30, "max": 60},
        ]
    },
    "advanced_tuck_front_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 30, "max": 95},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 165, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 60, "max": 95},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 0, "max": 30},
        ]
    },
    "straddle_front_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 30, "max": 95},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 165, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 175, "max": 180},
            {"name": "Leg Abduction", "points": ["RIGHT_KNEE", "MID_HIP", "LEFT_KNEE"], "min": 45, "max": 90},
        ]
    },
    "full_front_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 30, "max": 95},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 165, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 175, "max": 180},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 165, "max": 180},
        ]
    },
    "tuck_back_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 120, "max": 160},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 30, "max": 60},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 30, "max": 60},
        ]
    },
    "advanced_tuck_back_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 150, "max": 170},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 120, "max": 140},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 85, "max": 100},
        ]
    },
    "straddle_back_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 170, "max": 180},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 175, "max": 180},
            {"name": "Leg Abduction", "points": ["RIGHT_KNEE", "MID_HIP", "LEFT_KNEE"], "min": 45, "max": 90},
        ]
    },
    "full_back_lever": {
        "angles_to_check": [
            {"name": "Shoulder Angle", "points": ["LEFT_ELBOW", "LEFT_SHOULDER", "LEFT_HIP"], "min": 175, "max": 180},
            {"name": "Elbow Angle", "points": ["LEFT_SHOULDER", "LEFT_ELBOW", "LEFT_WRIST"], "min": 175, "max": 180},
            {"name": "Hip Angle", "points": ["LEFT_SHOULDER", "LEFT_HIP", "LEFT_KNEE"], "min": 175, "max": 180},
            {"name": "Knee Angle", "points": ["LEFT_HIP", "LEFT_KNEE", "LEFT_ANKLE"], "min": 175, "max": 180},
        ]
    }
}
