from pydantic import BaseSettings
import os


class Setting(BaseSettings):
    database_hostname:str
    database_port:str 
    database_name:str
    database_password:str 
    database_username:str
    secret_key:str
    algorithm:str
    access_tocken_expire_minutes:str
    origins = ['*',
    "http://localhost:8000",
    "http://localhost:3000/*",
    "http://localhost:3000/",
    "http://0.0.0.0:3000",
    "http://0.0.0.0:3000/auth/login/",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3000/login"]

    class Config:
        env_file= os.path.expanduser('.env')


settings = Setting()

