import httpx

law_service_url = "http://172.17.0.1:8003/api/law-service/precedents"
# law_service_url = "http://j10a604.p.ssafy.io:8003/api/law-service/precedents"


async def get_precedent(precedent_id: int):
    
    async with httpx.AsyncClient() as client:

        url = f"{law_service_url}/detail/{precedent_id}"
        
        response = await client.get(url)

        if response.status_code == 200:
            data = response.json().get('data')
            return data

        else:
            raise Exception(f"Request failed with status code {response.status_code}")