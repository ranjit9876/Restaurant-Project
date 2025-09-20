
import type { Chat } from "@google/genai";

export interface MenuItem {
    name: string;
    description: string;
    price: string;
    category: 'Appetizers' | 'Main Courses' | 'Desserts' | 'Drinks';
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

export interface ReservationState {
    chat: Chat | null;
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}
