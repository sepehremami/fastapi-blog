from pydantic import BaseSettings
import os

class Setting(BaseSettings):
    database_hostname:str ="localhost"
    database_port:str = "5432"
    database_name:str= 'fg'
    database_password:str = '11223'
    database_username:str=  "postgres"
    secret_key:str= "819975e4d4ca06ef5985720d388283611c43830e9e7e7c297aea9f6a504096f3"
    algorithm:str= "HS256"
    access_tocken_expire_minutes:str = "30"
    origins = [
    "http://localhost:8000",
    "https://localhost:3000/login",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3000/login"]
    class Config:
        env_file= os.path.expanduser('.env')


settings = Setting()

