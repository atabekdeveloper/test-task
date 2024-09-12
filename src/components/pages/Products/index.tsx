import { useCallback, useMemo, useState } from 'react';
import { useGetProductsQuery } from 'src/services/index.api';
import { Loading, Pagination, SearchSortHeader } from 'src/components/shared';
import { sortProducts } from 'src/data';
import { useDebounce } from 'src/hooks';

export const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [sortValue, setSortValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const debounceValue = useDebounce(searchQuery);

  const selectedSort = useMemo(() => {
    return sortProducts.find((value) => value.id === sortValue);
  }, [sortValue]);

  const { data: products, isLoading } = useGetProductsQuery({
    skip: currentPage,
    sortBy: selectedSort?.sortBy,
    order: selectedSort?.order,
    q: debounceValue,
  });

  const handleSortChange = useCallback((sortValue: number) => {
    setSortValue(sortValue);
  }, []);
  const handleSearchChange = useCallback((searchValue: string) => {
    setSearchQuery(searchValue);
  }, []);
  return (
    <>
      <SearchSortHeader
        searchQuery={searchQuery}
        sortValue={sortValue}
        sortOptions={sortProducts}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
      />
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.data.map((product) => (
          <div className="overflow-hidden bg-white rounded-lg shadow-lg" key={product.id}>
            <img src={product.thumbnail} alt={product.title} className="object-cover w-full h-48" />
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold">{product.title}</h3>
              <p className="mb-2 text-sm text-gray-600">{product.description}</p>
              <p className="mb-2 text-sm text-blue-600">Category: {product.category}</p>
              <p className="mb-2 text-lg font-semibold text-gray-800">${product.price}</p>
              <p className="text-sm text-yellow-500">Rating: {product.rating}</p>
              <p className="text-sm text-gray-500">Brand: {product.brand}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={currentPage} total={products?.total} setCurrentPage={setCurrentPage} />
    </>
  );
};
