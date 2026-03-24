import requests

class TogetherAIClient:
    def __init__(self, api_key):
        self.api_key = "aa040f50749ff637fe882040c40356a150a6d8bb0a74aac5dfbe895d13212658"
        self.base_url = "https://api.together.ai/"
        self.api_url = f"{self.base_url}v1/chat/completions"  # 🔥 FIXED: Added `api_url`

    def _get_headers(self):
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def send_message(self, message):
        try:
            payload = {
                "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",  # ✅ Add the required model
                "messages": [{"role": "user", "content": message}]
            }
            headers = self._get_headers()

            print("🚀 Sending request to TogetherAI API:", payload)

            response = requests.post(self.api_url, json=payload, headers=headers)

            if response.status_code != 200:
                print(f"❌ API Error {response.status_code}: {response.text}")
                return None  

            data = response.json()
            print("🤖 AI API Response:", data)

            return data.get("choices", [{}])[0].get("message", {}).get("content", "No response")  

        except requests.RequestException as e:
            print("❌ Request Exception:", str(e))
            return None

    def get_response(self, message_id):
        url = f"{self.base_url}/chatbot/get_response/{message_id}"
        headers = self._get_headers()
        response = requests.get(url, headers=headers)
        return response.json()
