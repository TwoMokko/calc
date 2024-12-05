import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

export function Pagination({page, limit, onChangePage}: {page: number, limit: number, onChangePage: (page: number) => void}): JSX.Element {



    return <div className='pagination'>
        <button
            className={`${page == 1 ? 'not-active' : ''}`}
            onClick={() => onChangePage(1)}
        >
            <MdKeyboardDoubleArrowLeft />
        </button>
        <button
            className={`${page == 1 ? 'not-active' : ''}`}
            onClick={() => onChangePage(page - 1)}
        >
            <MdKeyboardArrowLeft />
        </button>

        <button className='number'>{page}</button>

        <button
            className={`${page == limit ? 'not-active' : ''}`}
            onClick={() => onChangePage(page + 1)}
        >
            <MdKeyboardArrowRight />
        </button>
        <button
            className={`${page == limit ? 'not-active' : ''}`}
            onClick={() => onChangePage(limit)}
        >
            <MdKeyboardDoubleArrowRight />
        </button>
    </div>
}