import React from "react";
import AiRecipeForm from "./AiRecipeForm";

function AIChatPage() {
  return (
    <div
      className="
        min-h-screen 
        flex items-center justify-center p-4 
        transition-colors duration-300 
        bg-gradient-to-br from-orange-600 via-orange-500 to-orange-300 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
      "
    >
      <div
        className="
          w-full max-w-3xl 
          bg-white dark:bg-gray-900 
          text-gray-800 dark:text-gray-200 
          rounded-2xl shadow-xl 
          p-6 
          backdrop-blur-md
          max-h-[90vh] overflow-y-auto
          transition-colors duration-300
        "
      >
        <AiRecipeForm />
      </div>
    </div>
  );
}

export default AIChatPage;
