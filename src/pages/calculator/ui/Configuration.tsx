import {FC, ReactNode, useEffect, useState} from "react";
import {SelectCard} from "../../../shared/ui/SelectCard.tsx";

interface ConfigurationProps {
	option: string,
	data: { key: string, value: string }[],
	highlight: string[],
	onChange: (value: string) => void,
	onDelete: () => void,
}

export const Configuration: FC<ConfigurationProps> = (props): ReactNode => {
	const {
		option,
		data,
		highlight,
		onChange,
		onDelete
	} = props

	const [values, setValues] = useState<string[]>([])
	const getValues = () => {
		console.log({data})
		const temp: string[] = []
		data.map(itm => {
			temp.push(itm.value)

		})
		return temp

	}

	useEffect(() => {
		setValues(getValues)
	}, []);

	useEffect(() => {
		console.log({values})
	}, [values]);

	return <>
		<SelectCard
			option={option}
			values={values}
			onChange={onChange}
			onDelete={onDelete}
			highlight={highlight}
		/>
	</>
}