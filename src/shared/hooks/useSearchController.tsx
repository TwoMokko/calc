import { useSearchParams } from "react-router-dom";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {ru} from "../../pages/calculator/config/Languages.tsx";
import {languageData} from "../../app/types/types.ts";
export interface UrlProps {
	[key: keyof languageData]: string | undefined
}
const convertToUrl = (data: UrlProps) => Object.entries(data)
	.map(([key, value]) => !value || value == ru[key].default ? undefined : [key, value] as [string, string])
	.filter(itm => !!itm)



interface SearchContextProps {
	urls: UrlProps,
	set: (props: UrlProps) => void,
	setValue: (key: string, value?: string) => void,

}
const SearchContext = createContext<SearchContextProps>({
	urls: {},
	set: () => {},
	setValue: () => {}
})
const useSearchController = () => useContext(SearchContext)


export const SearchContextProvider = ({children}: {children: ReactNode}):ReactNode => {
	const [getSearchParams, setSearchParams] = useSearchParams()
	const [currentUrl, setCurrentUrl] = useState<UrlProps>({})

	useEffect(() => {
		const temp: UrlProps = {}
		for (const [key, value] of Object.entries(ru)) {
			temp[key] = getSearchParams.get(key) ?? value.default ?? ''
		}
		setCurrentUrl(temp)
		console.log('update URL')
	}, [])


	const setValue = (key: keyof languageData, value?: string) => {
		console.log('setVal', key, value, {currentUrl, getSearchParams})

		setCurrentUrl(prev => {
			prev[key] = value ? value : ''
			setSearchParams(convertToUrl(prev))
			return prev
		})
		// console.log('setVal 2', {currentUrl, getSearchParams})
	}

	const set = (props: UrlProps) => {
		console.log('set', props)

		setCurrentUrl(prev => {
			for (const [key, value] of Object.entries(ru)) {
				prev[key] = key in props ? props[key] : key in prev ? prev[key] : value.default ?? ''
			}
			setSearchParams(convertToUrl(prev))
			return prev
		})
		// console.log('set 2', {currentUrl, getSearchParams})
	}

	return <SearchContext.Provider value={{urls: currentUrl, set, setValue}}>{children}</SearchContext.Provider>
}


export default useSearchController