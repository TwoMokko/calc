export function Button({title, className}: {title: string, className?: string}): JSX.Element {
    return <button className={'btn ' + className}>{title}</button>
}