from call_llm import call_llm
from calculate_angle import calculate_angle
from skill_rules import SKILL_RULES

def analyze(selected_skill, landmarks):
    
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
