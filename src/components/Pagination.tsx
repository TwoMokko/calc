export function Pagination({page, size, limit, onChangeSize, onChangePage}: {page: number, size: number, limit: number, onChangeSize: (size: number) => void, onChangePage: (page: number) => void}): JSX.Element {

    function validateSize(val:  string) {
        let size = parseInt(val ? val : '0')
        if (size < 5)
            size = 5

        if (size > 100)
            size = 100

        onChangeSize(size)
    }

    return <div
    className='pagination-wrap'
    >
        <div
            className='pagination-page-size'
        >
            <div>Кол-во строк</div>
            <input
                className='page-size-input'
                defaultValue={size}
                onBlur={(event) => {validateSize(event.currentTarget.value)}}
            />
        </div>
        <div
            className='pagination'
        >
            <button
                className={`btn ${page == 1 ? 'not-active' : ''}`}
                onClick={() => onChangePage(1)}
            >
                первая страница
            </button>
            <button
                className={`previous ${page == 1 ? 'not-active' : ''}`}
                onClick={() => onChangePage(page-1)}
            >
            </button>

            <button className='btn'>{page}</button>

            <button
                className={`next ${page == limit ? 'not-active' : ''}`}
                onClick={() => onChangePage(page+1)}
            >
            </button>
            <button
                className={`btn ${page == limit ? 'not-active' : ''}`}
                onClick={() => onChangePage(limit)}
            >
                последняя страница
            </button>
        </div>
    </div>
}