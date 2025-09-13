from google import genai
from google.genai import types
import os
import cv2
import numpy as np
from dotenv import load_dotenv

SYSTEM_INSTRUCTIONS = """You are a helpful and expert fitness coach specializing in bodyweight skills like planche, and levers. """

def call_llm(feedback: str):

    api_key = os.environ["GOOGLE_API_KEY"]
    client = genai.Client(api_key = api_key)
    
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTIONS
        ),
        contents=feedback,
    )
    
    total_response = "**SHORT SUMMARY:**\n" + feedback + "\n\n" + "**IN-DEPTH ANALYSIS:**\n" + response.text
    
    return total_response