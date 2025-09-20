
import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";
import type { MenuItem } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMenuDescriptions(items: Omit<MenuItem, 'description'>[]): Promise<MenuItem[]> {
    const prompt = `
        You are an expert food writer for a luxury restaurant called "The Gilded Spoon".
        For each of the following dishes, write a short, sophisticated, and mouth-watering description (under 20 words).
        The output must be a valid JSON array of objects, where each object has "name" and "description" properties.
        Do not include the price or category in your response.

        Dishes: ${JSON.stringify(items.map(item => item.name))}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const descriptionsJson = JSON.parse(response.text);
        
        const descriptionsMap = new Map<string, string>();
        descriptionsJson.forEach((item: {name: string, description: string}) => {
            descriptionsMap.set(item.name, item.description);
        });

        return items.map(item => ({
            ...item,
            description: descriptionsMap.get(item.name) || 'Exquisite flavors await.'
        }));
    } catch (error) {
        console.error("Error generating menu descriptions:", error);
        // Fallback to a default description
        return items.map(item => ({...item, description: 'A delightful dish prepared by our finest chefs.'}));
    }
}

export function startReservationChat(): Chat {
    const systemInstruction = `You are "Aura," the AI concierge for "The Gilded Spoon," a luxurious restaurant.
Your role is to assist guests in booking a table. Be warm, professional, and efficient.
1. Greet the user and offer to help with a reservation.
2. Ask for the number of guests.
3. Ask for the desired date.
4. Ask for the desired time. Our hours are 5 PM to 11 PM.
5. Ask for a name for the reservation.
6. Ask if there are any special requests (e.g., allergies, celebration).
7. Once all information is gathered, provide a clear summary of the reservation details for confirmation.
8. After confirmation, thank the guest and say you look forward to welcoming them.
Keep your responses concise. Do not ask for contact information like phone or email.`;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
            temperature: 0.7,
        },
    });
    return chat;
}

export async function sendReservationMessage(chat: Chat, message: string): Promise<GenerateContentResponse> {
    const response = await chat.sendMessage({ message });
    return response;
}

export async function generateAboutUsStory(): Promise<string> {
    const prompt = `
        Write a short, elegant "About Us" story for a fictional high-end restaurant called "The Gilded Spoon".
        The story should be about 3-4 paragraphs.
        Evoke a sense of tradition, culinary passion, innovation, and an unforgettable dining experience.
        Mention a commitment to sourcing the finest local ingredients.
    `;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating About Us story:", error);
        return "Founded on a passion for culinary excellence, The Gilded Spoon offers a dining experience that marries tradition with innovation. Our chefs craft exquisite dishes using locally-sourced ingredients, ensuring every meal is a memorable celebration of flavor. We invite you to join us for an unforgettable evening.";
    }
}
