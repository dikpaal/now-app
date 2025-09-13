from call_llm import call_llm
from calculate_angle import calculate_angle

SKILL_RULES = {
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


def analyze_form(selected_skill, landmarks):
    
    if selected_skill not in SKILL_RULES:
        return f"Analysis for the skill '{selected_skill}' is not implemented yet."

    rules = SKILL_RULES[selected_skill]
    feedback_list = []

    for angle_rule in rules["angles_to_check"]:
        angle_name = angle_rule["name"]
        p1_name, p2_name, p3_name = angle_rule["points"]
        min_angle, max_angle = angle_rule["min"], angle_rule["max"]

        # Get coordinates for the three points
        p1 = landmarks.get(p1_name)
        p2 = landmarks.get(p2_name)
        p3 = landmarks.get(p3_name)

        # Robustness Check: Ensure all landmarks were detected
        if not all([p1, p2, p3]):
            missing_points = [name for name, point in zip([p1_name, p2_name, p3_name], [p1, p2, p3]) if not point]
            feedback = f"Could not check {angle_name} because the following points were not detected: {', '.join(missing_points)}."
            feedback_list.append(feedback)
            continue # Skip to the next angle

        # Calculate the angle and generate feedback
        calculated_angle = calculate_angle(p1, p2, p3)
        
        if min_angle <= calculated_angle <= max_angle:
            feedback = f"{angle_name}: Your angle is {calculated_angle:.1f}°, which is in the ideal range of {min_angle}-{max_angle}°."
        else:
            feedback = f"{angle_name}: Your angle is {calculated_angle:.1f}°. Try to aim for the ideal range of {min_angle}-{max_angle}°."
        
        feedback_list.append(feedback)
        
    all_feedback = "SKILL NAME: " + selected_skill + "\n\n" + "SHORT ANALYSIS RESULTS:\n\n" + "\n\n".join(feedback_list)
    
    llm_response = call_llm(all_feedback)

    return llm_response