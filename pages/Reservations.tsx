
import React, { useState, useEffect, useRef } from 'react';
import { startReservationChat, sendReservationMessage } from '../services/geminiService';
import type { ReservationState, ChatMessage } from '../types';

const Reservations: React.FC = () => {
    const [state, setState] = useState<ReservationState>({
        chat: null,
        messages: [],
        isLoading: false,
        error: null,
    });
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeChat = async () => {
            setState(prevState => ({ ...prevState, isLoading: true }));
            try {
                const chat = startReservationChat();
                const initialBotMessage = "Welcome to The Gilded Spoon. I can help you book a table. How many guests will be in your party?";
                
                // Simulate sending an initial prompt to get the greeting
                const response = await sendReservationMessage(chat, "Hello");

                setState({
                    chat,
                    messages: [{ sender: 'bot', text: response.text }],
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                setState({
                    chat: null,
                    messages: [],
                    isLoading: false,
                    error: "Sorry, our reservation system is currently unavailable. Please call us directly.",
                });
            }
        };

        initializeChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [state.messages]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userInput.trim() || state.isLoading || !state.chat) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
        setState(prevState => ({
            ...prevState,
            messages: [...prevState.messages, newUserMessage],
            isLoading: true,
        }));
        setUserInput('');

        try {
            const response = await sendReservationMessage(state.chat, userInput);
            const botMessage: ChatMessage = { sender: 'bot', text: response.text };
            setState(prevState => ({
                ...prevState,
                messages: [...prevState.messages, botMessage],
                isLoading: false,
            }));
        } catch (error) {
            console.error("Failed to send message:", error);
            const errorMessage: ChatMessage = { sender: 'bot', text: "I've encountered a problem. Please try again." };
            setState(prevState => ({
                ...prevState,
                messages: [...prevState.messages, errorMessage],
                isLoading: false,
            }));
        }
    };

    return (
        <div className="py-20 bg-brand-gray">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="text-5xl font-serif font-bold text-center text-brand-gold mb-4">Book Your Table</h1>
                <p className="text-center text-gray-300 mb-12">Chat with our AI Concierge, Aura, to find your perfect time.</p>

                <div className="bg-brand-dark shadow-xl rounded-lg overflow-hidden border border-brand-gray">
                    <div className="h-96 p-6 overflow-y-auto flex flex-col space-y-4">
                        {state.messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-brand-gold flex-shrink-0"></div>}
                                <div className={`px-4 py-2 rounded-lg max-w-sm ${msg.sender === 'user' ? 'bg-brand-gold text-brand-dark' : 'bg-brand-gray text-brand-light'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {state.isLoading && state.messages.length > 0 && (
                            <div className="flex items-end gap-2 justify-start">
                               <div className="w-8 h-8 rounded-full bg-brand-gold flex-shrink-0"></div>
                                <div className="px-4 py-2 rounded-lg bg-brand-gray text-brand-light">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                         {state.error && <p className="text-center text-red-400 text-sm">{state.error}</p>}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-gray bg-brand-dark flex items-center">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={state.isLoading || !!state.error}
                            className="w-full bg-brand-gray text-brand-light px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
                        />
                        <button type="submit" disabled={state.isLoading || !userInput.trim() || !!state.error} className="bg-brand-gold text-brand-dark font-bold px-6 py-2 rounded-r-md hover:bg-yellow-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reservations;
