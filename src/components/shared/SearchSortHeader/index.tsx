import { useLocation } from 'react-router-dom';

type TSortOption = {
  id: number;
  text: string;
  sortBy: string;
  order: string;
};

interface ISearchSortHeader {
  sortValue: number;
  sortOptions: TSortOption[];
  onSortChange: (id: number) => void;
}

export const SearchSortHeader: React.FC<ISearchSortHeader> = ({
  sortValue,
  onSortChange,
  sortOptions,
}) => {
  const { pathname } = useLocation();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(Number(e.target.value));
  };
  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-md shadow">
      <h1 className="text-xl font-semibold text-gray-700 capitalize">{pathname.substring(1)}</h1>
      <select
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
  );
};
