import React from 'react';
import AiRecipeForm from './AiRecipeForm';

function AIChatPage() {
    return (
       <div
            className="ai-chat-page"
            style={{
                background: `url('/ai-bg.jpeg') no-repeat center center fixed `,
                backgroundSize: 'cover',
            }}
        >
            <div className="ai-chat-overlay">
                <AiRecipeForm />
            </div>
        </div>
    );
}

export default AIChatPage;
