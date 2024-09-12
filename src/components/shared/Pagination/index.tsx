import React from 'react';
import { Pagination as HeadlessPagination } from 'react-headless-pagination';

type TPaginationParams = {
  page: number;
  total?: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<TPaginationParams> = ({ page, total, setCurrentPage }) => {
  return (
    <HeadlessPagination
      currentPage={page}
      setCurrentPage={(page) => setCurrentPage(page)}
      className="text-center"
      truncableText="..."
      truncableClassName="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed hidden md:block"
      totalPages={Math.ceil(total ? total / 6 : 1)}
      edgePageCount={2}
      middlePagesSiblingCount={1}
    >
      <ul className="inline-flex -space-x-px rounded-md shadow-sm isolate">
        <HeadlessPagination.PrevButton
          className={`pagination-item ${
            page === 0 && 'cursor-not-allowed opacity-80 hover:bg-gray-400'
          }`}
        >
          Previous
        </HeadlessPagination.PrevButton>
        <HeadlessPagination.PageButton
          activeClassName="bg-primary text-white"
          className="hidden pagination-item md:block"
        />
        <span className="p-3 md:hidden">
          {page + 1} / {Math.ceil(total ? total / 6 : 1)}
        </span>
        <HeadlessPagination.NextButton
          className={`pagination-item ${
            page + 1 === Math.ceil(total ? total / 6 : 1) &&
            'cursor-not-allowed opacity-80 hover:bg-gray-400'
          }`}
        >
          Next
        </HeadlessPagination.NextButton>
      </ul>
    </HeadlessPagination>
  );
};
