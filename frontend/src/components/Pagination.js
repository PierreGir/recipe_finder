import React from 'react';

const Pagination = ({ totalPages, currentPage, paginate }) => {
    const displayPages = () => {
        const pageButtons = [];
        const maxVisiblePages = 6;
    
        if (totalPages <= maxVisiblePages) {
          for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            pageButtons.push(
              <button
                key={pageNumber}
                className={`mx-2 py-1 px-3 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }
        } else {
          const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
          const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
          if (startPage > 1) {
            pageButtons.push(
              <button
                key={1}
                className={`mx-2 py-1 px-3 rounded-md ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => paginate(1)}
              >
                1
              </button>
            );
          }

          if (startPage > 2) {
            pageButtons.push(
              <span key="ellipsis-start" className="mx-2">
                ...
              </span>
            );
          }
    
          for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            pageButtons.push(
              <button
                key={pageNumber}
                className={`mx-2 py-1 px-3 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }
    
          if (endPage < totalPages - 1) {
            pageButtons.push(
              <span key="ellipsis-end" className="mx-2">
                ...
              </span>
            );
          }
          
          if (endPage < totalPages) {
            pageButtons.push(
              <button
                key={totalPages}
                className={`mx-2 py-1 px-3 rounded-md ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => paginate(totalPages)}
              >
                {totalPages}
              </button>
            );
          }
        }
    
        return pageButtons;
      };

  return <div className="flex justify-center mt-4">{displayPages()}</div>;
};

export default Pagination;
