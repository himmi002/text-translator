// App.jsx
import { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fromLang, setFromLang] = useState("en"); // default English
  const [toLang, setToLang] = useState("hi"); // default Hindi

  // yeh list hai languages ki with name + code
  const languages = [
    { name: "English", code: "en" },
    { name: "Hindi", code: "hi" },
    { name: "French", code: "fr" },
    { name: "Spanish", code: "es" },
    { name: "German", code: "de" },
    { name: "Chinese", code: "zh" }
  ];

  const handleTranslate = async () => {
  setTranslatedText("Translating...");

  try {
    const res = await fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2", {
      method: "POST",
      headers: {
        "content-type" : "application/json",
       "x-rapidapi-key": "7f0bf53b43msheaf80c4e905c04dp1f20bejsnacefb9b7aefd",
       "x-rapidapi-host": "deep-translate1.p.rapidapi.com"
      } ,
      body: JSON.stringify({
        q: inputText,
        source: fromLang,
        target: toLang
      })
    });

    // Agar response valid nahi hai
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("👉 API Response:", data);

    if (data?.data?.translations?.translatedText) {
      setTranslatedText(data.data.translations.translatedText);
    } else {
      setTranslatedText("Translation failed 😢");
    }
  } catch (error) {
    console.error("❌ API Error:", error);
    setTranslatedText("Error calling API");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-8 transition-all hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          🌐 Text Translator
        </h1>

        {/* Language Selectors */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col flex-1">
            <label className="text-gray-600 font-medium mb-2">From</label>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Arrow icon */}
          <div className="flex justify-center items-end">
            <span className="text-3xl text-indigo-500 mt-6 md:mt-8">↔</span>
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-gray-600 font-medium mb-2">To</label>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-2">Enter Text</label>
            <textarea
              className="w-full h-40 p-4 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
              placeholder="Type text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* Output Box */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-2">Translated Text</label>
            <div className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-gray-50 shadow-inner overflow-y-auto text-gray-700">
              {loading ? (
                <p className="text-center text-indigo-500 animate-pulse">
                  Translating...
                </p>
              ) : (
                translatedText || "Translation will appear here..."
              )}
            </div>
          </div>
        </div>

        {/* Translate Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold 
                       bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all 
                       shadow-md hover:shadow-lg disabled:opacity-60"
          >
            <span className="text-lg">↔</span>
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>
    </div>
  );
}
