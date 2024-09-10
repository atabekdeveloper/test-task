import { useState } from 'react';
import { useGetPostsQuery } from 'src/services/index.api';
import { Loading, Pagination, SearchSortHeader } from 'src/components/shared';
import { sortPosts } from 'src/data';

export const Posts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [sortValue, setSortValue] = useState(0);

  const { data: posts, isLoading } = useGetPostsQuery({
    skip: currentPage + 1,
    limit: 6,
    sortBy: findSortEl(sortValue)?.sortBy,
    order: findSortEl(sortValue)?.order,
  });

  function findSortEl(id: number) {
    return sortPosts.find((value) => value.id === id);
  }

  const handleSortChange = (sortValue: number) => {
    setSortValue(sortValue);
  };
  return (
    <>
      <SearchSortHeader
        sortValue={sortValue}
        sortOptions={sortPosts}
        onSortChange={handleSortChange}
      />
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.data.map((post) => (
          <div className="p-6 bg-white rounded-lg shadow-md" key={post.id}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-4 text-gray-700">{post.body}</p>

            <div className="flex flex-wrap mt-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 mb-2 mr-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">👍 {post.reactions.likes}</span>
                <span>👎 {post.reactions.dislikes}</span>
              </div>
              <span className="text-sm">👁️ {post.views} views</span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        page={currentPage}
        total={Number(((posts?.total ? posts.total : 30) / 5).toFixed(0))}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
