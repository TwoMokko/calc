import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {ru} from "../data/Languages.tsx";
import {languageData} from "../types/Types.tsx";

interface UrlProps {
	[key: keyof languageData]: string
}

const currentUrl: UrlProps = {}

const useSearchController = () => {
	const [getSearchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		for (const [key, value] of Object.entries(ru)) {
			currentUrl[key] = getSearchParams.get(key) ?? value.default ?? ''
		}
	}, []);


	const set = (key: string, value?: string) => {
		currentUrl[key] = value ? value : ''

		const url: [string, string][] = Object.entries(currentUrl)
			.map(([key, value]) => !value /*|| value == ru[key].default*/ ? undefined : [key, value] as [string, string])
			.filter(itm => !!itm)

		setSearchParams(url)
	}

	return [currentUrl, set] as [UrlProps, (key: string, value?: string) => void]
}

export default useSearchController