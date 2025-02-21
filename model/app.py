from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI()

origins = [
    "http://localhost",  # Allow localhost (you can add more origins as needed)
    "http://localhost:3000",  # Example for frontend running on port 3000
    "*",  # Allow all origins (use this with caution)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Check if GPU is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Load model and tokenizer on the selected device
print("Loading model...")
tokenizer = AutoTokenizer.from_pretrained("Lukamac/PlayPart-AI-Personal-Trainer")
model = AutoModelForCausalLM.from_pretrained("Lukamac/PlayPart-AI-Personal-Trainer").to(device)
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, device=0 if torch.cuda.is_available() else -1)
print("Model loaded successfully!")

# Input schema for API requests
class TextGenerationRequest(BaseModel):
    prompt: str
    max_length: int = 50  # Optional: Default maximum length of generated text
    num_return_sequences: int = 1  # Optional: Default number of generated sequences

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the GPU-Accelerated Text Generation API!"}

# Endpoint for text generation
@app.post("/generate/")
def generate_text(request: TextGenerationRequest):
    try:
        # Generate text using the pipeline
        output = pipe(
            request.prompt,
            max_length=request.max_length,
            num_return_sequences=request.num_return_sequences,
        )
        # Extract generated text
        generated_texts = [result["generated_text"] for result in output]
        return {"prompt": request.prompt, "generated_texts": generated_texts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    