import { useState } from "react";
import { X } from "lucide-react";

export default function Page() {
  const [input, setInput] = useState('{"data":["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Invalid JSON input or server error");
    }
  };

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const removeFilter = (filter) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">API Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-md min-h-[100px] font-mono"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {response && (
        <div className="mt-6 space-y-4">
          <div className="relative">
            <label className="text-sm text-gray-600">Multi Filter</label>
            <div className="mt-1 p-2 border rounded-md min-h-[40px] flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm"
                >
                  {filter}{" "}
                  <X
                    className="ml-1 h-4 w-4 cursor-pointer"
                    onClick={() => removeFilter(filter)}
                  />
                </span>
              ))}
            </div>
            <div className="absolute right-2 top-8">
              <button
                type="button"
                onClick={() => {
                  const dropdown = document.getElementById("filter-dropdown");
                  if (dropdown) {
                    dropdown.classList.toggle("hidden");
                  }
                }}
                className="p-2"
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <div
              id="filter-dropdown"
              className="hidden absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg"
            >
              <div className="p-2">
                <div
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  onClick={() => toggleFilter("Numbers")}
                >
                  Numbers
                </div>
                <div
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  onClick={() => toggleFilter("Highest Alphabet")}
                >
                  Highest Alphabet
                </div>
                <div
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                  onClick={() => toggleFilter("Alphabets")}
                >
                  Alphabets
                </div>
              </div>
            </div>
          </div>

          {response && selectedFilters.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Filtered Response</h3>
              {selectedFilters.includes("Numbers") && response.numbers && (
                <div className="mb-2">
                  <p className="font-medium">Numbers:</p>
                  <div className="flex flex-wrap gap-2">
                    {response.numbers.map((num, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedFilters.includes("Highest Alphabet") &&
                response.highest_alphabet && (
                  <div className="mb-2">
                    <p className="font-medium">Highest Alphabet:</p>
                    <div className="flex flex-wrap gap-2">
                      {response.highest_alphabet.map((alpha, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                        >
                          {alpha}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {selectedFilters.includes("Alphabets") && response.alphabets && (
                <div className="mb-2">
                  <p className="font-medium">Alphabets:</p>
                  <div className="flex flex-wrap gap-2">
                    {response.alphabets.map((alpha, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                      >
                        {alpha}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
