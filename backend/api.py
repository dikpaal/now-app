# Dummy FastAPI app
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import base64
import os
import uuid
from pose_detector import perform_pose_detection
import analyze

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

@app.get("/")
def read_root():
    return {"Landing": "Page"}

@app.post("/analyze")
async def analyze_photo(request: Request):
    print("--- HEADERS RECEIVED ---")
    print(request.headers)
    print("------------------------")

    try:
        form_data = await request.form()
        uploaded_file = form_data.get("file")
        selected_skill = form_data.get("skill_id")

        if not uploaded_file or not hasattr(uploaded_file, 'read'):
            print("ERROR: 'file' not found in form data or is not a file.")
            return JSONResponse(status_code=400, content={"message": "File not found in request."})

        contents = await uploaded_file.read()
        processed_image_bytes, landmarks, image_bytes = perform_pose_detection(contents)
        processed_image_base64 = base64.b64encode(processed_image_bytes).decode("utf-8")
        
        feedback = analyze_form(selected_skill, landmarks)

        return JSONResponse(content={
            "processedImage": processed_image_base64,
            "analysis": feedback,
            "skillLevel": "Beginner+"
        })

    except Exception as e:
        print(f"An error occurred during processing: {e}")
        return JSONResponse(status_code=500, content={"message": f"An unexpected error occurred: {e}"})
