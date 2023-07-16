import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { PerPageEnum } from './enums';

export interface IPaginationProps {
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  currentPage: number;
  totalCount: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination = (props: IPaginationProps) => {
  const { perPage, onPerPageChange, currentPage, onNextPage, onPreviousPage, totalCount } = props;

  const renderPageLable = () => {
    const start = currentPage * perPage + 1;
    const end = (currentPage + 1) * perPage;

    if (end > totalCount) {
      return `${start} of ${totalCount}`;
    }

    return `${start} - ${end} of ${totalCount}`;
  };

  return (
    <nav className='flex items-center space-x-5'>
      {/* Per Page */}
      <div>
        <label>Rows per page: </label>
        <select
          className='border border-none focus:ring-0 focus:outline-none focus:border-none'
          onChange={(e) => onPerPageChange(parseInt(e.target.value))}
          defaultValue={perPage}>
          {/* Loop enum */}
          {Object.values(PerPageEnum).map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
      {/* Label */}
      <p>{renderPageLable()}</p>
      {/* Button */}
      <div className='flex items-center space-x-10'>
        {/* Previous */}
        <button onClick={onPreviousPage} disabled={currentPage === 0} className='cursor-pointer'>
          <ChevronLeftIcon width={20} height={20} />
        </button>
        {/* Next */}
        <button
          onClick={onNextPage}
          disabled={currentPage * perPage + perPage >= totalCount}
          className='cursor-pointer'>
          <ChevronRightIcon width={20} height={20} />
        </button>
      </div>
    </nav>
  );
};

Pagination.defaultProps = {
  perPage: 5,
  currentPage: 0,
  totalCount: 0,
};

export default Pagination;
