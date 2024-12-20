import { ChatMessage } from "../stores/chat";

const API_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8`
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

export async function sendAiMessage(message: string, chat: ChatMessage[]): Promise<string | null> {

   if (!API_TOKEN) {
      console.warn("Cloudflare API token not found")
       return null;
   }
   const messages = chat.map((m) => ({
       role: m.role,
       content: m.content
   }))

  const payload = {
      messages: [...messages, { role: 'user', content: message}]
   }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
               'Authorization': `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
          body: JSON.stringify(payload)
        })
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json();
       return data.result.response
   }
    catch (e:any) {
      console.error("Error fetching AI response", e)
       return null;
    }

}