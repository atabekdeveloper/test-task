import { useCallback, useMemo, useState } from 'react';
import { useGetUsersQuery } from 'src/services/index.api';
import { Loading, Pagination, SearchSortHeader } from 'src/components/shared';
import { sortUsers } from 'src/data';
import { useDebounce } from 'src/hooks';

export const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [sortValue, setSortValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const debounceValue = useDebounce(searchQuery);

  const selectedSort = useMemo(() => {
    return sortUsers.find((value) => value.id === sortValue);
  }, [sortValue]);

  const { data: users, isLoading } = useGetUsersQuery({
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
        sortOptions={sortUsers}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
      />
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {users?.data.map((user) => (
          <div className="p-4 bg-white rounded-lg shadow-md" key={user.id}>
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h2 className="mt-4 text-xl font-semibold text-center">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-center text-gray-500">{user.age} years old</p>
            <p className="text-center text-gray-500 capitalize">{user.gender}</p>
            <p className="mt-2 text-center">
              <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                {user.email}
              </a>
            </p>
            <p className="mt-1 text-center">{user.phone}</p>
            <p className="text-center text-gray-400">{user.birthDate}</p>
          </div>
        ))}
      </div>
      <Pagination page={currentPage} total={users?.total} setCurrentPage={setCurrentPage} />
    </>
  );
};
