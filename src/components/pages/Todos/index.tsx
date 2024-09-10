import { useState } from 'react';
import { useGetTodosQuery } from 'src/services/index.api';
import { Loading, Pagination, SearchSortHeader } from 'src/components/shared';
import { sortTodos } from 'src/data';

export const Todos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [sortValue, setSortValue] = useState(0);

  const { data: todos, isLoading } = useGetTodosQuery({
    skip: currentPage + 1,
    limit: 6,
    sortBy: findSortEl(sortValue)?.sortBy,
    order: findSortEl(sortValue)?.order,
  });

  function findSortEl(id: number) {
    return sortTodos.find((value) => value.id === id);
  }

  const handleSortChange = (sortValue: number) => {
    setSortValue(sortValue);
  };
  return (
    <>
      <SearchSortHeader
        sortValue={sortValue}
        sortOptions={sortTodos}
        onSortChange={handleSortChange}
      />
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {todos?.data.map((todoItem) => (
          <div
            key={todoItem.id}
            className={`p-4 rounded-lg shadow-md ${
              todoItem.completed ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <h3 className="text-lg font-semibold">{todoItem.todo}</h3>
            <p className={`mt-2 ${todoItem.completed ? 'text-green-600' : 'text-red-600'}`}>
              {todoItem.completed ? 'Completed' : 'Not Completed'}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        page={currentPage}
        total={Number(((todos?.total ? todos.total : 30) / 5).toFixed(0))}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
