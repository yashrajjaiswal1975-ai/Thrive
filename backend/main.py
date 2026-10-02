import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client


# --------------------------------------------------
# LOAD ENVIRONMENT VARIABLES
# --------------------------------------------------

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL is missing from .env")

if not SUPABASE_KEY:
    raise RuntimeError("SUPABASE_KEY is missing from .env")


# --------------------------------------------------
# SUPABASE CLIENT
# --------------------------------------------------

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY,
)


# --------------------------------------------------
# FASTAPI APP
# --------------------------------------------------

app = FastAPI(
    title="THRIVE Backend",
    description="Backend API for the THRIVE cognitive assistance platform",
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# MODELS
# --------------------------------------------------

class UserCreate(BaseModel):
    name: str
    age: int


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }


# --------------------------------------------------
# DATABASE TEST
# --------------------------------------------------

@app.get("/db-test")
def database_test():

    try:
        response = (
            supabase
            .table("users")
            .select("*")
            .limit(5)
            .execute()
        )

        users = response.data or []

        return {
            "database": "connected",
            "users_found": len(users),
            "users": users,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------------------------
# GET USERS
# --------------------------------------------------

@app.get("/users")
def get_users():

    try:

        response = (
            supabase
            .table("users")
            .select("*")
            .execute()
        )

        return {
            "users": response.data or []
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# --------------------------------------------------
# CREATE USER
# --------------------------------------------------

@app.post("/users")
def create_user(user: UserCreate):

    try:

        response = (
            supabase
            .table("users")
            .insert({
                "name": user.name,
                "age": user.age,
            })
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=500,
                detail="User was not created"
            )

        return {
            "message": "User created successfully",
            "user": response.data[0],
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )