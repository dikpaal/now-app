import math
import numpy as np

def calculate_angle(a, b, c):
    
    # Convert points to numpy arrays
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    # Create vectors pointing away from the vertex b
    # ba = a - b
    # bc = c - b
    ba = a - b
    bc = c - b
    
    # Calculate the dot product and the cosine of the angle
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    
    # Calculate the angle in radians AND convert to degrees
    angle = np.arccos(cosine_angle)
    
    return np.degrees(angle)