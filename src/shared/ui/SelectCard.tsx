import { FC, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ru } from "../../pages/calculator/config/Languages.tsx";

// TODO: одинаковые методы, вынести куда-то?

interface SelectCardProps {
	value?: string,
	option: string,
	values: string[],
	onChange: (value: string) => void,
	highlight: string[] | undefined,
	onDelete?: () => void,
	not?: {
		color?: boolean,
		search?: boolean,
		reset?: boolean
	}
}

export const SelectCard: FC<SelectCardProps> = ({value, option, values, onChange, highlight, onDelete, not}): JSX.Element => {
	/** Constants */
	const inputRef = useRef<HTMLInputElement>(null)							// TODO: дописать
	const [showList, setShowList] = useState<boolean>(false)					// TODO: дописать
	const [inputValue, setInputValue] = useState<string>('')					// TODO: дописать
	const [currentValues, setCurrentValues] = useState<string[]>(values)				// TODO: дописать

	const [currentValue, setCurrentValue] = useState<string>('')				// TODO: дописать
	const [className, setClassName] = useState<string>()								// TODO: дописать


	/** Constants (functions) */
	/* TODO: дописать */
	const focusInput = () => {
		if (showList && inputRef.current)
			inputRef.current.focus()
	}

	/* При клике на параметр выпадающего списка обновить значение в компоненте и основные данные через callback */
	const doClick = (val: string): void => {
		setCurrentValue(val)
		onChange(val)
	}

	/* Сбросить значения в основных данных через callback и сбросить значение в компоненте */
	const onReset = (): void => {
		onDelete && onDelete()
		setCurrentValue('')
	}


	/** UseEffects */
	/* При инициализации компонента TODO: дописать */
	useEffect(() => {
		const method = () => {
			if (inputRef.current != document.activeElement)
				setShowList(false)
		}

		document.addEventListener('click', method, false)
		return () => document.removeEventListener('click', method, false)
	}, []);

	/* При изменении состояние видимости списка с деревом, вызвать фокус на инпуте */
	useEffect(focusInput, [showList]);

	/* TODO: дописать */
	useEffect(() => {
		setCurrentValue(value ?? '')
	}, [value])

	/* При изменении совместимых параметров или значения в поле input отсортировать список */
	useEffect(() => {
		setCurrentValues(prev => {
			return [
				...prev.sort((a, b) => {

					const aIn = highlight?.includes(a)
					const bIn = highlight?.includes(b)

					if (inputValue) {
						let aSearch = a.search(inputValue.toUpperCase()) != -1
						let bSearch = b.search(inputValue.toUpperCase()) != -1

						if (aSearch && !bSearch)
							return -1
						else if (bSearch && !aSearch)
							return +1;

						return 0
					} else {

						if (aIn && !bIn)
							return -1
						else if (bIn && !aIn)
							return +1;

						return 0
					}
				})
			]
		})
	}, [highlight, inputValue])

	/* При изменении списка совместимых параметров или выбранного значения изменить покраску */
	useEffect(() => {
		if (not?.color) {
			setClassName('not-color')
			return
		}

		currentValue ?
			(highlight?.length ?
				(highlight?.includes(currentValue) ? setClassName('well') : setClassName('error'))
				: setClassName('selected-disable'))
			: (highlight?.length ? setClassName('well') : setClassName('disable'))
	}, [highlight, currentValue]);


	/** Build DOM */
	return <div className={`input-search ${className}`}>
		<div className='input-search-head'>
			<h4>{ru[option].title}</h4>
			{
				inputValue && <div
					// onClick={onReset}
                    onClick={() => {
						setInputValue('')
						onReset()
					}}
                    className='reset-option'
                    title={`сбросить всё для ${ru[option].title}`}
                >
                </div>
			}
		</div>
		<div className='input-search-wrap'>
			<div className='input-search-wrap-top'
				 onClick={() => setShowList(true)}
			>
				{ ru[option].icon }

				{
					!not?.reset
						? (currentValue ? <div
							className='checked-list-item'
							onMouseDown={onReset}
							title={`сбросить значение: ${currentValue}`}
						>
							<div>{currentValue}</div>
							<div
								className='unchecked'
							></div>
						</div> : '')
						: currentValue
				}


				<div className={`input-search-wrap-text ${not?.search ? 'flex-null' : ''}`}>
					<input
						readOnly={not?.search}
						ref={inputRef}
						value={inputValue}
						onChange={event => {
							setInputValue(event.currentTarget.value)
						}}
					/>
				</div>
				<MdKeyboardArrowDown
					className={`${showList ? 'show' : ''}`}
				/>
			</div>
			{
				showList && <div className='input-search-list'>
					{
						currentValues.map((val) => {
							return <div
								key={val}
								className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (val == currentValue ? className : 'disable')}`}
								onMouseDown={() => doClick(val)}
							>
								{
									!inputValue
										? val
										: <span
											dangerouslySetInnerHTML={{__html: val.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>
								}
							</div>
						})
					}
				</div>
			}
		</div>
	</div>
}