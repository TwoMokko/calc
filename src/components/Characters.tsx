import {InputCard} from "./InputCard.tsx";
import {useEffect, useState} from "react";
import {physicalCharacteristics} from "../types/Types.tsx";
import {isEqual} from "lodash";
import {
	MdExplore,
	MdOutlineCenterFocusWeak, MdOutlineFullscreen, MdOutlineFullscreenExit,
	MdOutlineThermostat,
	MdSensorWindow,
} from "react-icons/md";
import {SelectCardMultipleTree} from "./SelectCardMultipleTree.tsx";

const characteristic: { [key: string]: [string, JSX.Element] } = {
	minTemperature: ['Temp min (от и ниже)', <MdOutlineThermostat/>],
	minPressure: ['Давление min', <MdOutlineFullscreenExit/>],
	cv: ['Cv', <MdSensorWindow/>],
	bodyPressure: ['ДавлКорп (от и выше)', <MdExplore/>],
	maxTemperature: ['Temp max (от и выше)', <MdOutlineThermostat/>],
	maxPressure: ['Давление max', <MdOutlineFullscreen/>],
	dn: ['Dn', <MdOutlineCenterFocusWeak/>],
}

export function Characters({values, onChange, valuesTree, highlightTree, onChangeSelectTree, colorSelect}: {
	values?: physicalCharacteristics,
	onChange: (chars?: physicalCharacteristics) => void,
    highlightTree: string[] | undefined,
	onChangeSelectTree: (keys: string[]) => void,
	colorSelect: boolean,
	valuesTree?: string[]
}): JSX.Element {
	const [chars, setChars] = useState<physicalCharacteristics | undefined>()

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
					Object.keys(characteristic).map(key => {
						// @ts-ignore
						return <InputCard value={values && key in values ? values[key] : undefined}
										  key={key}
										  char={key}
										  title={characteristic[key][0]}
										  className='character-group-select'
										  onInput={onInput}
										  icon={characteristic[key][1]}
						/>
					})
				}
			</div>
		</section>
	</>
}