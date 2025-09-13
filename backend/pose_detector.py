import os
import cv2
import mediapipe as mp
import numpy as np

def perform_pose_detection(image_bytes):
    # Initialize MediaPipe's Pose solution
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.7)
    
    mp_drawing = mp.solutions.drawing_utils

    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if image is None:
        print(f"Error: Could not decode image from bytes.")
        raise ValueError("Could not decode image from bytes.")

    # MediaPipe works with RGB images, but OpenCV reads them in BGR format.
    # So, we need to convert the color space.
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Process the image and find the pose
    print("Detecting pose...")
    results = pose.process(image_rgb)

    # --- Print and Draw Keypoints ---
    if results.pose_landmarks:
        print("\n--- Keypoints Detected ---")
        
        landmarks = {}
        
        # Get the image dimensions to un-normalize the coordinates
        image_height, image_width, _ = image.shape
        
        # Iterate over all detected landmarks
        for idx, landmark in enumerate(results.pose_landmarks.landmark):
            # Get the name of the landmark using the PoseLandmark enum
            landmark_name = mp_pose.PoseLandmark(idx).name
            
            # The landmark coordinates are normalized (from 0.0 to 1.0)
            # We convert them to pixel coordinates
            pixel_x = int(landmark.x * image_width)
            pixel_y = int(landmark.y * image_height)
            
            # Print the keypoint name and its coordinates
            print(f"-> {landmark_name:<20}: ({pixel_x}, {pixel_y})")
            
            landmarks[landmark_name] = (pixel_x, pixel_y)

        print("\nDrawing landmarks on the image...")
        # Draw the landmarks and connections on the original BGR image
        annotated_image = image.copy()
        mp_drawing.draw_landmarks(
            annotated_image,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing.DrawingSpec(color=(0,255,0), thickness=2, circle_radius=2),
            connection_drawing_spec=mp_drawing.DrawingSpec(color=(0,0,255), thickness=2, circle_radius=2)
        )

        # Convert the annotated image (NumPy array) back to bytes
        is_success, buffer = cv2.imencode(".jpg", annotated_image)
        if not is_success:
            raise ValueError("Could not encode processed image to bytes.")
        processed_image_bytes = buffer.tobytes()

        # Return the processed image bytes and landmarks
        return processed_image_bytes, landmarks, image_bytes

    else:
        print("No human pose detected in the image.")
        raise ValueError("No human pose detected in the image.")
