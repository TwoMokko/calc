import {FC, ReactNode, useEffect, useState} from "react";
import { InputCard } from "../../../shared/ui/InputCard.tsx";
import { physicalCharacteristics } from "../../../app/types/types.ts";
import { isEqual } from "lodash";
import { ru } from "../config/Languages.tsx";

/* Нужно, чтобы создать определенное количество полей */
const characteristic: string[] = [
	'minTemperature',
	'cv',
	'pressure',
	'bodyPressure',
	'maxTemperature',
	'dn',
]

interface CharactersProps {
	values?: physicalCharacteristics,
	onChange: (chars?: physicalCharacteristics) => void,
}

export const Characters: FC<CharactersProps> = ({values, onChange}): ReactNode => {
	console.log('chars')

	/** Constants */
	const [chars, setChars] = useState<physicalCharacteristics | undefined>(values)					// Состояние для работы с характеристиками внутри компонента


	/** Constants (functions) */
	/* Изменение характеристик внутри компонента (по ключу) */
	const onInput = (key: string, value: string) => {
		setChars(prev => {
			return {...prev, [key]: parseInt(value)}
		})
	}


	/** UseEffects */
	/* При изменении состояния характеристик, вызвать callback функцию (для изменения хирактеристик в основных данных) */
	useEffect(() => {
		onChange(chars)
	}, [chars]);

	/* При изменении данных, приходящих извне, обновить данные в компоненте (только в том случае, если они не равны) */
	useEffect(() => {
		if (!isEqual(values, chars))
			setChars(values)
	}, [values]);


	/** Build DOM */
	return <>
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
	</>
}