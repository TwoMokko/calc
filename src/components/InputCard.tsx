
export function InputCard({char, title, className, onInput}: {char: string, title: string, className: string, onInput: (char: string, value: string) => void}) {

    return <div className={className}>
        <h4>{title}</h4>
        <input
            onInput={(event) => {onInput(char, event.currentTarget.value)}}
        />
    </div>
}
