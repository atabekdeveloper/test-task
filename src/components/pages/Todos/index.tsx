import { useState } from 'react';
import { useGetTodosQuery } from 'src/services/index.api';
import { Loading, Pagination } from 'src/components/shared';
import { useLocation } from 'react-router-dom';

export const Todos: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { pathname } = useLocation();

  const { data: todos, isLoading } = useGetTodosQuery({
    skip: currentPage,
  });
  return (
    <>
      <div className="p-4 bg-white rounded-md shadow">
        <h1 className="text-xl font-semibold text-gray-700 capitalize">{pathname.substring(1)}</h1>
      </div>
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
      <Pagination page={currentPage} total={todos?.total} setCurrentPage={setCurrentPage} />
    </>
  );
};
