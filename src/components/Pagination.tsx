import {page} from "../routes/CalcPage.tsx";

export function Pagination({page}: {page: page}) {

    return <div
    className='pagination-wrap'
    >
        <div
            className='pagination-page-size'
        >
            <div>Кол-во строк</div>
            <input
                className='page-size-input'
                value={page.sizePage}
            />
        </div>
        <div
            className='pagination'
        >
            <div className='btn not-active'>первая страница</div>
            <div className='previous not-active'></div>
            <div className='btn'>{page.currentPage}</div>
            <div className='next'></div>
            <div className='btn'>последняя страница</div>
        </div>
    </div>
}