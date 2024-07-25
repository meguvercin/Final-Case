import files.kampanya as kampanya
from dotenv import load_dotenv,find_dotenv
import os
from openai import OpenAI
import json

load_dotenv(find_dotenv(),override=True)
OPENAI_KEY=os.environ.get("OPENAI_KEY")

client = OpenAI(api_key=OPENAI_KEY)

def get_structured_response(prompt):
    response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": prompt}
    ]
    )
    return response



def useGpt(prompt):
    response=get_structured_response(prompt)
    dictItem=response.choices[0].message.content
    str=""
    flag=False
    for i in range(0, len(dictItem)):
        if(dictItem[i]=="{" or flag==True):
            flag=True
            str+=dictItem[i]
        if(dictItem[i]=="}" and flag ==True):
            return str        
    


