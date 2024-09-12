import { useLocation } from 'react-router-dom';

type TSortOption = {
  id: number;
  text: string;
  sortBy: string;
  order: string;
};

interface ISearchSortHeader {
  sortValue: number;
  searchQuery: string;
  sortOptions: TSortOption[];
  onSortChange: (id: number) => void;
  onSearchChange: (query: string) => void;
}

export const SearchSortHeader: React.FC<ISearchSortHeader> = ({
  sortValue,
  searchQuery,
  onSortChange,
  onSearchChange,
  sortOptions,
}) => {
  const { pathname } = useLocation();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(Number(e.target.value));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  const clearSearch = () => {
    onSearchChange('');
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-white rounded-md shadow">
      <h1 className="text-xl font-semibold text-gray-700 capitalize">{pathname.substring(1)}</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="relative max-sm:w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md pr-7 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute text-gray-400 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <select
          className="px-4 py-2 border rounded-md max-sm:w-full focus:outline-none focus:ring-2 focus:ring-primary"
          value={sortValue}
          onChange={handleSortChange}
        >
          {sortOptions.map((el) => (
            <option key={el.id} value={el.id}>
              {el.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
