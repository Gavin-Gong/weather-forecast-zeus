import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  initialValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValue = "",
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await onSearch(query);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="输入城市名称"
        className="flex-1 p-3 border-0 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`bg-blue-500/90 text-white py-3 rounded-lg transition-all ${
          isLoading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-blue-600 hover:shadow-md cursor-pointer"
        } backdrop-blur-sm shadow-sm w-24 flex justify-center`}
      >
        <span className="flex items-center gap-2">
          {isLoading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          搜索
        </span>
      </button>
    </form>
  );
};
