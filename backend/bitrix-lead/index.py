import json
import os
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any
from pydantic import BaseModel, Field, validator


class LeadRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)
    
    @validator('email')
    def validate_email(cls, v):
        if '@' not in v or '.' not in v.split('@')[1]:
            raise ValueError('Invalid email format')
        return v


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Creates lead in Bitrix24 CRM from contact form submission
    Args: event with httpMethod, body; context with request_id
    Returns: HTTP response with lead creation status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    webhook_url = os.environ.get('BITRIX_WEBHOOK_URL')
    if not webhook_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Bitrix webhook URL not configured'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    lead_data = LeadRequest(**body_data)
    
    bitrix_params = {
        'FIELDS': {
            'TITLE': f'Заявка с сайта от {lead_data.name}',
            'NAME': lead_data.name,
            'EMAIL': [{'VALUE': lead_data.email, 'VALUE_TYPE': 'WORK'}],
            'COMMENTS': lead_data.message,
            'SOURCE_ID': 'WEB',
            'STATUS_ID': 'NEW'
        }
    }
    
    api_url = f'{webhook_url.rstrip("/")}/crm.lead.add.json'
    
    post_data = json.dumps(bitrix_params).encode('utf-8')
    req = urllib.request.Request(
        api_url,
        data=post_data,
        headers={'Content-Type': 'application/json'}
    )
    
    response = urllib.request.urlopen(req, timeout=10)
    response_data = json.loads(response.read().decode('utf-8'))
    
    if response_data.get('result'):
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'lead_id': response_data['result'],
                'message': 'Заявка успешно отправлена!'
            }),
            'isBase64Encoded': False
        }
    else:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Failed to create lead in Bitrix24'
            }),
            'isBase64Encoded': False
        }
