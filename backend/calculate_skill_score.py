import math
from calculate_angle import calculate_angle

def calculate_angle_score(calculated_angle, min_angle, max_angle, tolerance=15):
    """
    Calculate score for a single angle based on how close it is to the optimal range.
    
    Args:
        calculated_angle (float): The measured angle in degrees
        min_angle (float): Minimum acceptable angle
        max_angle (float): Maximum acceptable angle  
        tolerance (float): Tolerance factor for exponential decay (default: 15 degrees)
    
    Returns:
        float: Score from 0 to 100
    """
    if calculated_angle is None:
        return 0.0
    
    # If within optimal range, perfect score
    if min_angle <= calculated_angle <= max_angle:
        return 100.0
    
    # Calculate deviation from nearest boundary
    deviation = min(abs(calculated_angle - min_angle), abs(calculated_angle - max_angle))
    
    # Apply exponential decay based on deviation
    score = 100 * math.exp(-deviation / tolerance)
    
    # Ensure score is between 0 and 100
    return max(0.0, min(100.0, score))

def calculate_skill_score(selected_skill, landmarks, skill_rules):
    """
    Calculate overall skill performance score based on all angle measurements.
    
    Args:
        selected_skill (str): Name of the skill being analyzed
        landmarks (dict): Dictionary of body landmark coordinates
        skill_rules (dict): Skill configuration with angle requirements
        
    Returns:
        dict: Contains overall score, individual angle scores, and missing landmarks info
    """
    if selected_skill not in skill_rules:
        return {
            "overall_score": 0.0,
            "angle_scores": {},
            "missing_landmarks": [],
            "error": f"Skill '{selected_skill}' not found in rules"
        }
    
    rules = skill_rules[selected_skill]
    angle_scores = {}
    missing_landmarks = []
    valid_scores = []
    
    for angle_rule in rules["angles_to_check"]:
        angle_name = angle_rule["name"]
        p1_name, p2_name, p3_name = angle_rule["points"]
        min_angle, max_angle = angle_rule["min"], angle_rule["max"]
        
        # Get coordinates for the three points
        p1 = landmarks.get(p1_name)
        p2 = landmarks.get(p2_name) 
        p3 = landmarks.get(p3_name)
        
        # Check if all landmarks are available
        if not all([p1, p2, p3]):
            missing_points = [name for name, point in zip([p1_name, p2_name, p3_name], [p1, p2, p3]) if not point]
            missing_landmarks.extend(missing_points)
            angle_scores[angle_name] = {
                "score": 0.0,
                "calculated_angle": None,
                "target_range": [min_angle, max_angle],
                "status": f"Missing landmarks: {', '.join(missing_points)}"
            }
            continue
        
        # Calculate the angle
        try:
            calculated_angle = calculate_angle(p1, p2, p3)
            score = calculate_angle_score(calculated_angle, min_angle, max_angle)
            
            angle_scores[angle_name] = {
                "score": round(score, 1),
                "calculated_angle": round(calculated_angle, 1),
                "target_range": [min_angle, max_angle],
                "status": "in_range" if min_angle <= calculated_angle <= max_angle else "out_of_range"
            }
            
            valid_scores.append(score)
            
        except Exception as e:
            angle_scores[angle_name] = {
                "score": 0.0,
                "calculated_angle": None,
                "target_range": [min_angle, max_angle],
                "status": f"Calculation error: {str(e)}"
            }
    
    # Calculate overall score as average of valid angle scores
    if valid_scores:
        overall_score = sum(valid_scores) / len(valid_scores)
    else:
        overall_score = 0.0
    
    return {
        "overall_score": round(overall_score, 1),
        "angle_scores": angle_scores,
        "missing_landmarks": list(set(missing_landmarks)),  # Remove duplicates
        "passing_threshold": 65.0,
        "is_passing": overall_score >= 65.0
    }