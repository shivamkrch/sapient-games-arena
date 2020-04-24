import React from "react";

const Pagination = ({ page, lastPage, onPageChange }) => {
  return (
    <nav aria-label="Page navigation" className="mt-3">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${page === 1 ? "disabled" : ""}`}
          title="Go to first page"
        >
          <button
            className="page-link"
            aria-label="First Page"
            onClick={() => onPageChange(-page + 1)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">First Page</span>
          </button>
        </li>
        <li
          className={`page-item ${page === 1 ? "disabled" : ""}`}
          title="Go to previous page"
        >
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => onPageChange(-1)}
          >
            <span aria-hidden="true">&lt;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        <li className="page-item active">
          <span className="page-link d-none d-sm-block">
            Page {page} of {lastPage}
          </span>
          <span className="page-link d-sm-none">{page}</span>
        </li>
        <li
          className={`page-item ${page === lastPage ? "disabled" : ""}`}
          title="Go to next page"
        >
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => onPageChange(1)}
          >
            <span aria-hidden="true">&gt;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
        <li
          className={`page-item ${page === lastPage ? "disabled" : ""}`}
          title="Go to last page"
        >
          <button
            className="page-link"
            aria-label="Last Page"
            onClick={() => onPageChange(lastPage - page)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Last Page</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
