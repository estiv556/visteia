import { useState } from "react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImageUrl(data.url);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Diseña tu camiseta con IA</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Escribe tu idea: 'Un gato cósmico sobre una nube rosa'"
        className="w-full border rounded-lg px-4 py-2 mb-4"
      />
      <button
        onClick={handleGenerate}
        className="bg-black text-white px-6 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar diseño"}
      </button>

      {imageUrl && (
        <div className="mt-6">
          <p className="mb-2 text-gray-600">Tu diseño:</p>
          <img src={imageUrl} alt="Resultado IA" className="rounded-lg" />
        </div>
      )}
    </div>
  );
}
