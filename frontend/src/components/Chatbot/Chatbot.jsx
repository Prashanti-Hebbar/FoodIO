// frontend/src/components/Chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import recipes from "../../data/recipes";
import "./Chatbot.css";

const ONBOARDING = [
  "Hi! I'm your FoodIO Assistant. 🍴",
  "Ask me about adding recipes, finding them, or saving favorites!"
];

const FAQ = [
  {
    triggers: ["top recipes", "best recipes", "top rated"],
    response: () => {
      const pool = (recipes.topRated && recipes.topRated.length)
        ? recipes.topRated
        : [...(recipes.topRated || []), ...(recipes.trending || []), ...(recipes.newest || [])];
      const top = pool.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
      if (!top.length) return "No top rated recipes found.";
      return "🍴 **Top Rated Recipes**\n\n" +
        top.map((r, i) => `${i + 1}. ${r.title} ⭐ ${r.rating ?? "—"}`).join("\n\n");
    }
  },
  {
    triggers: ["trending recipes", "popular recipes"],
    response: () => {
      const pool = (recipes.trending && recipes.trending.length)
        ? recipes.trending
        : [...(recipes.trending || []), ...(recipes.topRated || []), ...(recipes.newest || [])];
      const list = pool.slice(0, 5);
      if (!list.length) return "No trending recipes found.";
      return "🔥 **Trending Recipes**\n\n" +
        list.map((r, i) => `${i + 1}. ${r.title} ${r.views ? `👀 ${r.views} views` : `(rating ${r.rating ?? "—"})`}`).join("\n\n");
    }
  },
  {
    triggers: ["new recipes", "latest recipes", "newest recipes"],
    response: () => {
      const pool = (recipes.newest && recipes.newest.length)
        ? recipes.newest
        : [...(recipes.newest || []), ...(recipes.topRated || []), ...(recipes.trending || [])].slice().reverse();
      const list = pool.slice(0, 5);
      if (!list.length) return "No new recipes found.";
      return "🆕 **Newest Recipes**\n\n" +
        list.map((r, i) => `${i + 1}. ${r.title}${r.createdAt ? ` (added ${new Date(r.createdAt).toLocaleDateString()})` : ""}`).join("\n\n");
    }
  },
  {
    triggers: ["how do i add a recipe", "add recipe", "create recipe"],
    response: `
🍲 **Whip Up a New Recipe!**  

1. Click **Dashboard** (your kitchen command center!).  
2. Hit **Add Recipe** – time to get creative!  
3. Fill in the details:  
   - **Recipe Title**  
   - **Upload Photo**  
   - **Description**  
   - **Ingredients**  
   - **Instructions**  
   - **Prep/Cook Time**  
4. Click **SAVE RECIPE** – your masterpiece is in your collection 🏆`
  },
  {
    triggers: ["find recipe", "search recipe", "recipes", "where are recipes"],
    response: `
🔍 **Hunting for Recipes?**  

Use **Dashboard → Categories**:  
- 🍽️ Meal Type  
- 🥗 Diet  
- 🌎 Cuisine  
- 🥩 Main Ingredient  
- 👨‍🍳 Cooking Method  
- ⏱️ Time / Difficulty`
  },
  {
    triggers: ["save", "save recipe", "bookmark", "favorite"],
    response: `
💾 **Saved Recipes Are a Click Away!**  

Check your **My Recipes**, **Favorite Recipes**, or **Saved Recipes** sections.`
  },
  {
    triggers: ["login", "signin", "signup", "register"],
    response: `Hit **Login/Sign Up** or use **Google sign-in** for quick access.`
  },
  {
    triggers: ["theme", "dark", "light", "dark mode"],
    response: `Toggle **Dark/Light mode** at the bottom of the page to match your mood.`
  },
  {
  triggers: ["tell me a joke", "joke", "funny", "food joke"],
  response: () => getNextJoke()
},
{
  triggers: ["tip", "give me a tip", "cooking tip"],
  response: () => getRandomTip()
},
{
  triggers: ["help", "what can you do", "commands"],
  response: `Hi! I'm your FoodIO Assistant. 🍴
You can ask me things like:
- How do I add a recipe?
- Find recipes (top, trending, newest)
- Save or bookmark recipes
- Change theme (dark/light)
- Login or signup`
}
];

// --- Community Tips (Mini Bot) ---
const COMMUNITY_TIPS = [
"🍋 Tip: Always zest your lemon before juicing for extra flavor!",
"🥗 Did you know? Adding a pinch of salt to your fruit enhances sweetness.",
"🍕 Fun fact: The first pizza was made in Naples in the 18th century!",
"🔥 Trending recipe: Try our Spicy Tofu Stir Fry for a quick dinner!",
"🍫 Pro tip: Chill chocolate before slicing for perfect squares.",
"🥄 Tip: Let cooked pasta rest for a minute before serving to lock in flavor.",
"🍳 Cooking tip: Preheat your pan before adding eggs for fluffier omelets.",
"🥘 Quick tip: Stir-fry vegetables on high heat for crispiness and color.",
"🍓 Tip: Freeze overripe berries and use them in smoothies or desserts.",
"🌿 Fresh tip: Tear herbs by hand instead of cutting to release essential oils.",
"🥖 Baking tip: Let bread cool completely before slicing for best texture.",
"🥩 Meat tip: Rest your steak for 5-10 minutes after cooking to retain juices.",
"🥫 Pantry tip: Store spices in a cool, dark place to keep them fresh longer.",
"🍚 Rice tip: Rinse rice before cooking to remove excess starch.",
"🥛 Dairy tip: Bring eggs or milk to room temperature before baking.",
"🍲 Soup tip: Add acid (lemon or vinegar) at the end to brighten flavors.",
"🍌 Fruit tip: Store bananas separately to slow down ripening.",
"🧄 Garlic tip: Crush garlic with the side of a knife for stronger flavor.",
"🌶️ Spice tip: Toast whole spices before grinding for deeper aroma.",
"🧂 Salt tip: Taste your food before adding more salt—sometimes less is more.",
"🍯 Sweet tip: Add a pinch of salt to caramel to enhance richness.",
"🍝 Pasta tip: Save some pasta water for your sauce to improve consistency.",
"🥚 Egg tip: Add a pinch of salt to boiling water to prevent eggs from cracking.",
"🥔 Potato tip: Soak cut potatoes in water before frying for extra crispiness.",
"🧅 Onion tip: Chill onions before cutting to reduce tears.",
"🥕 Veggie tip: Blanch vegetables before freezing to keep color and flavor.",
"🥪 Sandwich tip: Toast bread lightly for extra crunch without drying out.",
"🍋 Citrus tip: Roll lemons before juicing to get more juice.",
"🥩 Marinade tip: Marinate meat at least 30 minutes for deeper flavor.",
"🍷 Cooking tip: Deglaze pans with wine or broth to capture all flavors.",
"🫒 Olive oil tip: Use extra virgin for finishing, not for high-heat frying.",
"🥒 Cucumber tip: Peel partially for a rustic look and texture.",
"🧀 Cheese tip: Grate frozen cheese for easy topping and less clumping.",
"🍞 Toasting tip: Let bread sit 1-2 minutes after toasting to crisp evenly.",
"🍅 Tomato tip: Add salt while cooking to intensify sweetness.",
"🥗 Salad tip: Dress salad just before serving to avoid soggy leaves.",
"🍋 Lemon tip: Mix lemon juice with water to keep cut fruit fresh.",
"🥩 Grilling tip: Oil your grill, not your meat, to prevent sticking.",
"🥄 Cooking tip: Stir frequently to prevent burning and stickiness.",
"🥥 Coconut tip: Chill coconut milk before shaking for easier separation.",
"🍯 Honey tip: Add honey at the end of cooking to preserve aroma.",
"🫛 Bean tip: Soak beans overnight to reduce cooking time.",
"🍎 Apple tip: Toss sliced apples in lemon water to prevent browning.",
"🌽 Corn tip: Boil corn in salted water for 3-5 minutes for sweetness.",
"🥬 Leafy tip: Wash greens in cold water and spin dry to keep crisp.",
"🧂 Baking tip: Always measure flour by weight for accuracy.",
"🍫 Chocolate tip: Melt chocolate slowly over double boiler to prevent seizing.",
"🥗 Herb tip: Add delicate herbs like parsley at the end for freshness.",
"🍠 Sweet potato tip: Bake sweet potatoes wrapped in foil for soft texture.",
"🥘 Pan tip: Never overcrowd pans—cook in batches for even searing.",
"🍹 Drink tip: Chill glasses before serving cocktails for best experience."
];

// --- Food Jokes ---
const FOOD_JOKES = [
"Why did the tomato turn red? Because it saw the salad dressing! 🥗😳",
"I'm on a seafood diet. I see food and I eat it… but I can also help you cook it! 🐟🤣",
"Why did the cookie go to the doctor? Because it felt crumby! 🍪🤒",
"What do you call cheese that isn’t yours? Nacho cheese! 🧀😆",
"Why did the chef break up with their partner? Too much thyme apart! ⏱️💔",
"Why don’t eggs tell jokes? They’d crack each other up! 🥚😂",
"What does a spice say when it’s excited? Jalapeño business! 🌶️😜",
"Why did the pancake get promoted? It was on a roll! 🥞🏆",
"Why did the lettuce blush? Because it saw the salad dressing! 🥗😳",
"Why did the bread go to therapy? It felt crumby inside. 🍞😔",
"What’s a potato’s favorite game? Mash-termind! 🥔🎮",
"Why did the chef go to art school? To learn how to make food pictures perfect! 🎨🍳",
"Why did the banana go to the doctor? Because it wasn’t peeling well. 🍌🤕",
"Why did the grapes never get married? They couldn’t find the perfect pear! 🍇💍",
"Why did the tomato turn down the chance to star in a movie? It didn’t want to be canned. 🍅🎬",
"Why did the cookie cry? Because its mom was a wafer too long. 🍪😭",
"Why did the chef quit his job? He didn’t have enough thyme. ⏱️👨‍🍳",
"What did the pasta say to the sauce? 'You complete me!' 🍝❤️",
"Why did the chef break the egg? He had eggsasperation! 🥚😤",
"What did the apple say to the pie? 'You’ve got me baked!' 🍎🥧",
"Why was the cucumber so cool? Because it was in a pickle! 🥒😎",
"Why did the milk go to school? To become cultured! 🥛🎓",
"Why did the coffee file a police report? It got mugged. ☕🚓",
"Why did the sugar file a complaint? It was in a sticky situation! 🍬😅",
"Why did the grape stop in the middle of the road? It ran out of juice! 🍇🚦",
"What did the fork say to the spoon? 'You’re too shallow!' 🍴🥄",
"Why did the chef go to jail? He beat the eggs! 🍳🚔",
"Why did the potato sit in the sun? To get a tan! 🥔☀️",
"Why did the cookie break up with the chocolate chip? Too many chips on its shoulder! 🍪😆",
"What did the lettuce say to the celery? 'Quit stalking me!' 🥬😳",
"Why did the chef get promoted? He really knew his onions! 🧅🏅",
"Why did the tomato cross the road? To ketchup with its friends! 🍅🚶",
"Why did the chef refuse to fight? He didn’t want to stir the pot! 🍲🥊",
"Why did the bread go to school? To improve its loaf! 🍞📚",
"What did the butter say to the bread? 'I’m on a roll!' 🧈🍞",
"Why did the cookie go to school? Because it wanted to be smartie! 🍪🎓",
"What did the grape say when it got stepped on? Nothing, it just let out a little wine! 🍇🍷",
"Why did the orange stop? It ran out of juice! 🍊😅",
"What did the chef say to the steak? 'You’re well done!' 🥩👏",
"Why did the sugar go to therapy? It couldn’t deal with all the pressure! 🍬🛋️",
"Why did the pancake go to the doctor? It was feeling flat! 🥞🤕",
"What did the egg say to the frying pan? 'You crack me up!' 🥚😂",
"Why did the chef cross the road? To get to the other recipe! 👨‍🍳🚶",
"What do you call a fake noodle? An impasta! 🍝😆",
"Why did the tomato blush? Because it saw the salad dressing! 🥗😳",
"What did the chocolate say to the marshmallow? 'You make me melt!' 🍫💞",
"Why did the bread go to the party? Because it kneaded to have fun! 🍞🎉",
"Why did the chef sit on the cake? He wanted to be a little layer! 🎂😂",
"What did the soup say to the sandwich? 'You complete me!' 🥪🍲",
"Why did the potato blush? It saw the salad dressing! 🥗😳"
];


let shownTipIndices = [];
function getRandomTip() {
  if (shownTipIndices.length === COMMUNITY_TIPS.length) shownTipIndices = [];
  let index;
  do { index = Math.floor(Math.random() * COMMUNITY_TIPS.length); } 
  while (shownTipIndices.includes(index));
  shownTipIndices.push(index);
  return COMMUNITY_TIPS[index];
}

let shownJokeIndices = [];
function getNextJoke() {
  if (shownJokeIndices.length === FOOD_JOKES.length) shownJokeIndices = [];
  let index;
  do { index = Math.floor(Math.random() * FOOD_JOKES.length); } while (shownJokeIndices.includes(index));
  shownJokeIndices.push(index);
  return FOOD_JOKES[index];
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef(null);
  const endRef = useRef(null);

  const QUICK_QUESTIONS = [
    "How do I add a recipe?",
    "Where are dessert recipes?",
    "How do I save a recipe?",
    "How do I login?",
    "How do I change theme?",
    "What are top recipes?"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("foodio_chat_messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("foodio_chat_messages", JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

// --- On Chatbot Open: Onboarding + Community Tip ---
useEffect(() => {
    if (open && messages.length === 0) {
      const intro = ONBOARDING.map((t, i) => ({ from: "bot", text: t, id: Date.now() + i }));
      setTimeout(() => setMessages((p) => [...p, ...intro]), 200);

      // Randomly show tip or joke after onboarding
      setTimeout(() => {
        const isTip = Math.random() < 0.5;
        const extraMsg = isTip
          ? { from: "bot", text: getRandomTip(), type: "tip", id: Date.now() + 1000 }
          : { from: "bot", text: getNextJoke(), type: "joke", id: Date.now() + 1000 };
        setMessages((p) => [...p, extraMsg]);
      }, 800);

      setTimeout(() => inputRef.current?.focus(), 300);
    } else if (open) inputRef.current?.focus();
  }, [open, messages]);

  function searchRecipes(searchTerm) {
    const term = searchTerm.toLowerCase();

    const allRecipes = [
      ...(recipes.topRated || []),
      ...(recipes.trending || []),
      ...(recipes.newest || []),
    ];

    const results = allRecipes.filter(recipe => {
      return (
        recipe.title.toLowerCase().includes(term) ||
        recipe.mainIngredient.toLowerCase().includes(term) ||
        recipe.category.toLowerCase().includes(term) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(term))
      );
    });

    if (results.length) {
      return results.map(r =>
        `🍽️ **${r.title}**\n\n**Ingredients:** ${r.ingredients.map(i => i.name).join(", ")}${
          r.instructions ? `\n**Instructions:** ${r.instructions}` : ""
        }`
      ).join("\n\n---\n\n");
    }

    // Always return something, even if no matches
    return `Sorry, I couldn't find recipes for "${searchTerm}". Here's a tip instead: ${getRandomTip()}`;
  }

  async function findResponse(text) {
    const lc = text.toLowerCase().trim();

    // 1. FAQ match
    for (const item of FAQ) {
      for (const trig of item.triggers) {
        if (lc.includes(trig)) {
          if (typeof item.response === "function") return await item.response();
          return item.response;
        }
      }
    }

    // 2. Recipe match
    return searchRecipes(text);
  }

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text) return;
    const userMsg = { from: "user", text, id: Date.now() };
    setMessages((p) => [...p, userMsg]);

    setTimeout(async () => {
      const botText = await findResponse(text);
      const botMsg = { from: "bot", text: botText, id: Date.now() + 1 };
      setMessages((p) => [...p, botMsg]);
    }, 500);
  }

  function handleSubmit(e) {
    e?.preventDefault();
    sendMessage(input);
    setInput("");
  }

  async function quickQA(question) { await sendMessage(question); }

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((s) => !s); }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

 return (
    <>
      {open && (
        <div className="chatbot-container">
          {/* Chat Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="icon">👨‍🍳</div>
              <div>
                <div className="title">FoodIO Assistant</div>
                <div className="subtitle">Quick help & onboarding</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="close-btn">✕</button>
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.length === 0 && <div style={{ paddingTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>Ask a question to get started.</div>}
             {messages.map((m) => {
              if (m.type === "tip") {
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="message-wrapper bot">
                    <div className="tip-message-container">
                      <div className="tip-label">💡 Tip</div>
                      <div className="message-bubble bot-message"><ReactMarkdown>{m.text}</ReactMarkdown></div>
                    </div>
                  </motion.div>
                );
              }
              if (m.type === "joke") {
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="message-wrapper bot">
                    <div className="tip-message-container">
                      <div className="tip-label">😂 Joke</div>
                      <div className="message-bubble bot-message"><ReactMarkdown>{m.text}</ReactMarkdown></div>
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`message-wrapper ${m.from}`}>
                  <div className={`message-bubble ${m.from === 'user' ? 'user-message' : 'bot-message'}`}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </motion.div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Quick Questions */}
          <div className="quick-questions">
            {(showAll ? QUICK_QUESTIONS : QUICK_QUESTIONS.slice(0, 3)).map((q, i) => (
              <button key={i} onClick={() => quickQA(q)} className="quick-question-btn">
                {q}
              </button>
            ))}
            <button onClick={() => setShowAll(!showAll)} className="quick-question-btn">
              {showAll ? "See less" : "See more"}
            </button>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="input-form">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="input-field" />
            <button type="submit" className="send-btn" disabled={!input.trim()}>➤</button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!open && (
        <button
            aria-label="Open help chat"
            onClick={() => setOpen((s) => !s)}
            className="fab-btn"
        >
            👨‍🍳
        </button>
        )}
    </>
  );
}