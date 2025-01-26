import {FC, ReactNode} from "react";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

interface PaginationProps {
    page: number,
    limit: number,
    onChangePage: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({page, limit, onChangePage}): ReactNode => {

    return <div className='pagination'>
        <button
            className={`${page == 1 ? 'not-active' : ''}`}
            onClick={() => onChangePage(1)}
        >
            <MdKeyboardDoubleArrowLeft/>
        </button>
        <button
            className={`${page == 1 ? 'not-active' : ''}`}
            onClick={() => onChangePage(page - 1)}
        >
            <MdKeyboardArrowLeft/>
        </button>

        <button className='number'>{page}</button>
        {/*<input*/}
        {/*    className='number'*/}
        {/*    onBlur={event => onChangePage(parseInt(event.currentTarget.value))}*/}
        {/*    defaultValue={page}*/}
        {/*/>*/}

        <button
            className={`${page == limit ? 'not-active' : ''}`}
            onClick={() => onChangePage(page + 1)}
        >
            <MdKeyboardArrowRight/>
        </button>
        <button
            className={`${page == limit ? 'not-active' : ''}`}
            onClick={() => onChangePage(limit)}
        >
            <MdKeyboardDoubleArrowRight/>
        </button>
    </div>
}