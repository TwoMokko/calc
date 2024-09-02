export function Button({title, className, onClick}: {title: string, className?: string, onClick: Function}): JSX.Element {
    return <button
        className={'btn ' + className}
        onClick={() => {onClick()}}
    >
        {title}
    </button>
}