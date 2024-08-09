export type PaginationProps = {
  currentPage: number;
  onClick: (number: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ onClick, currentPage }) => {
  const getPrevPage = () => {
    onClick(currentPage - 1);
  };

  const getNextPage = () => {
    onClick(currentPage + 1);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex h-10 -space-x-px text-base">
        <li>
          <button
            onClick={getPrevPage}
            className="ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        <li>
          <button className="flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {currentPage}
          </button>
        </li>
        <li>
          <button
            onClick={getNextPage}
            className="flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
