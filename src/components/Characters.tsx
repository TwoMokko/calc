import {InputCard} from "./InputCard.tsx";
import {useEffect, useState} from "react";
import {physicalCharacteristics} from "../types/Types.tsx";
import {isEqual} from "lodash";
import {SelectCardMultipleTree} from "./SelectCardMultipleTree.tsx";
import {ru} from "../data/Languages.tsx";

const characteristic: string[] = [
	'minTemperature',
	'minPressure',
	'cv',
	'bodyPressure',
	'maxTemperature',
	'maxPressure',
	'dn',
]

export function Characters({values, onChange, valuesTree, highlightTree, onChangeSelectTree, colorSelect}: {
	values?: physicalCharacteristics,
	onChange: (chars?: physicalCharacteristics) => void,
	highlightTree: string[] | undefined,
	onChangeSelectTree: (keys: string[]) => void,
	colorSelect: boolean,
	valuesTree?: string[]
}): JSX.Element {
	const [chars, setChars] = useState<physicalCharacteristics | undefined>(values)

	const onInput = (key: string, value: string) => {
		setChars(prev => {
			return {...prev, [key]: parseInt(value)}
		})
	}

	useEffect(() => {
		onChange(chars)
	}, [chars]);


	useEffect(() => {
		if (!isEqual(values, chars))
			setChars(values)
	}, [values]);


	return <>
		<section className={`section ${colorSelect ? '' : 'not-color'}`}>
			<h2>Характеристики</h2>
			<SelectCardMultipleTree
				onChange={onChangeSelectTree}
				highlight={highlightTree}
				valuesFilter={valuesTree}
			/>
			<div className='character-group block'>
				{
					characteristic.map(char => {
						// @ts-ignore
						return <InputCard value={values && char in values ? values[char] : undefined}
										  key={char}
										  char={char}
										  title={ru[char].title}
										  className='character-group-select'
										  onInput={onInput}
										  icon={ru[char].icon}
						/>
					})
				}
			</div>
		</section>
	</>
}