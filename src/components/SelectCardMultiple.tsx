import { FC, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";
import { MdElectricBolt, MdKeyboardArrowDown } from "react-icons/md";

// TODO: одинаковые методы, вынести куда-то?

interface SelectCardMultipleProps {
	title: string,
	value?: string[],
	values: string[],
	onChange: (types: string[]) => void,
	highlight?: string[]
}

export const SelectCardMultiple: FC<SelectCardMultipleProps> = ({title, value, values, onChange, highlight}): JSX.Element => {
	/** Constants */
	const inputRef = useRef<HTMLInputElement>(null)						// TODO: дописать
	const [showList, setShowList] = useState(false)						// TODO: дописать
	const [checked, setChecked] = useState<string[]>([])					// TODO: дописать
	const [inputValue, setInputValue] = useState<string>('')				// TODO: дописать
	const [currentValues, setCurrentValues] = useState<string[]>(values)			// TODO: дописать
	const [className, setClassName] = useState<string>('')				// TODO: дописать

	/** Constants (functions) */
	/* TODO: дописать */
	const focusInput = () => {
		if (showList && inputRef.current)
			inputRef.current.focus()
	}

	/* При клике на параметр выпадающего списка обновить список выбранных (checkbox) и основные данные через callback */
	const onClick = (value: string, status?: boolean): void => {
		if (!value) {
			setChecked([])
			onChange([])
			return
		}

		const changes = !status
			? checked.filter(itm => itm != value)
			: [...checked, value]
		setChecked(changes)
		onChange(changes)
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

	/* При изменении списка совместимых параметров или списка выбранных изменить покраску */
	useEffect(() => {
		checked.length ?
			((highlight?.length) ?
				(checked.some(itm => highlight.includes(itm)) ? setClassName('well') : setClassName('error'))
				: setClassName('selected-disable'))
			: ((highlight?.length) ? setClassName('well') : setClassName('disable'))
	}, [highlight, checked]);

	/* TODO: дописать */
	useEffect(() => {
		if (!isEqual(value ?? [], checked))
			setChecked(value ?? [])
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


	/** Build DOM */
	return <div
		className={`input-search ${className}`}
	>
		<div className='input-search-head'>
			<h4>{title}</h4>
			{
				(checked.length > 0) && <div
                    onClick={() => onClick('')}
                    className='reset-option'
                    title={`сбросить: ${title}`}
                >
                </div>
			}
		</div>
		<div className='input-search-wrap'>
			<div className='input-search-wrap-top'
				 onClick={() => setShowList(true)}
			>
				<MdElectricBolt/>
				<div className='input-search-wrap-text-wrap'>
					{
						checked.length > 0 && <div className='checked-list'>
							{
								checked.map(val => {
									return <div
										key={val}
										className={`checked-list-item ${highlight?.includes(val) ? '' : (checked.includes(val) ? 'error' : 'disable')}`}
										onClick={() => onClick(val, false)}
									>
										<div>{val}</div>
										<div className='unchecked'></div>
									</div>
								})
							}
                        </div>
					}
					<div className='input-search-wrap-text'>
						<input
							ref={inputRef}
							onChange={event => setInputValue(event.currentTarget.value)}
							value={inputValue}
						/>
					</div>
				</div>
				<MdKeyboardArrowDown
					className={`${showList ? 'show' : ''}`}
				/>
			</div>
			{showList && <div className='input-search-list'>
				{
					currentValues.map(val => {
						return <label
							className={`input-search-list-item ${highlight?.includes(val) ? 'well' : (checked.includes(val) ? 'error' : 'disable')}`}
							key={val}
							onClick={focusInput}
						>
							<input
								className='hide'
								type='checkbox'
								value={val}
								checked={checked.includes(val)}
								onChange={
									(event) => onClick(val, event.currentTarget.checked)
								}
							/>
							<div className='check'>
								{!inputValue
									? val
									: <span
										dangerouslySetInnerHTML={{__html: val.replace(inputValue.toUpperCase(), `<mark>${inputValue.toUpperCase()}</mark>`)}}/>
								}
							</div>
						</label>
					})
				}
            </div>}
		</div>
	</div>
}