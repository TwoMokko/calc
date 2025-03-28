import { PiCubeFill } from "react-icons/pi";
import { useState } from "react";
import { dataForTableDownLoadModels } from "../../../features/models/model/types.ts";
import { LuLoader } from "react-icons/lu";
import { MdDownload, MdSendTimeExtension } from "react-icons/md";
import { domains } from "../../../app/model/global.ts";
import { getDataForTableDownload } from "../../../features/models/api/fetches.ts";
import Loader from "../../../widgets/Loader/ui/Loader.tsx";
import Button from "../../../shared/ui/Button.tsx";

const emailForInternalUse = 'Для внутреннего использования'

// TODO: оптимизировать компонент, разнести по логичным местам
const ModelsPage = () => {
	/** Constants */
	const [data, setData] = useState<dataForTableDownLoadModels>()										// Данные, которые приходят для заполнения таблицы после того, как пользователь ввёл список артикулов и нажал на кнопку Генерировать (там есть список неправильно введенных артикулов и данные для таблицы)
	const [vendorCodes, setVendorCodes] = useState<string[]>()											// Список (массив) артикулов, которые уходят в запросе на данные ждя таблицы (для скачивания моделей)
	const [loading, setLoading] = useState<boolean>(false)									// Флаг, чтобы показать, что идет загрузка
	const [loadingVendorCodes, setLoadingVendorCodes] = useState<string[]>([])				// Состояние, чтобы отображать загрузку при скачивании файла
	const [email, setEmail] = useState<string>(emailForInternalUse)										// email, который в поле ввода и который потом отправится в запросе
	const [emailValid, setEmailValid] = useState<boolean>(true)								// Флаг, отвечающий за валидность email

	/* Проверка на email */
	const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

	/** Constants (functions) */
	// При нажатии на кнопку Генерировать отправляется запрос на список данных
	// (которые потом будут в таблице отрисовываться)
	const doGenerate = async () => {
		console.log('do generate', vendorCodes)
		// TODO: проверить, поменялось ли что-то в textarea, а точнее массив vendorCodes (и если нет, то return)

		setLoading(true)

		if (vendorCodes) setData(await getDataForTableDownload(vendorCodes))
		setLoading(false)
	}

	// Из textarea (строки) создается массив артикулов (через перенос строки),
	// Дубликаты удаляются, вызывается при onChange на textarea
	const validateVendorCodes = (value: string) => {
		const vendorCodesAll = value.split(/\r?\n/)
		const vendorCodesSort: string[] = []

		vendorCodesAll.map(itm => {
			if (itm && !vendorCodesSort.includes(itm)) vendorCodesSort.push(itm)
		})

		setVendorCodes(vendorCodesSort)
	}

	// Скачать всё, бежит по пришедшим данным (у которых есть модель) и вызывает функцию скачивания файла (параметр - артикул)
	const downloadAll = async () => {
		if (emailValid && data?.data)
			for await (const itm of data.data) await downloadModel(itm.vendorCode)
	}

	// Скачивание одного файла через тег anchor
	const downloadModel = async (currentVendorCode: string) => {
		if (emailValid) {
			setLoadingVendorCodes(prev => [...prev, currentVendorCode])
			const fromSpecPage = true
			const anchor: HTMLAnchorElement = document.createElement('a')
			anchor.href = `${domains.MODELS}/api/v1/models/load/${currentVendorCode}?format=stp&?fromSpecPage=${fromSpecPage}`
			// anchor.download = `${currentVendorCode}.${format}`
			anchor.download = `${currentVendorCode}.stp`
			anchor.click()

			await new Promise((res) => {
				setTimeout(res, 1000)
			})
			setLoadingVendorCodes(prev => prev.filter(vCode => vCode != currentVendorCode))
		}
	}

	// const downloadModel = (currentVendorCode: string) => {
	// 	console.log({emailValid})
	// 	if (emailValid) {
	// 		console.log('oops')
	// 		setLoadingVendorCodes(prev => [...prev, currentVendorCode])
	// 		getFileModel(currentVendorCode, () => {
	// 			const anchor: HTMLAnchorElement = document.createElement('a')
	// 			anchor.href = `${domains.MODELS}/api/v1/models/load/${currentVendorCode}?format=stp`
	// 			// anchor.download = `${currentVendorCode}.${format}`
	// 			anchor.download = `${currentVendorCode}.stp`
	// 			anchor.click()
	//
	// 			setLoadingVendorCodes(prev => prev.filter(itm => itm != currentVendorCode))
	// 		})
	// 	}
	// }

	/** Build DOM */
	return <>
		<div className='calc-top-wrap'>
			<div className='calc-top'>
				<h1>
					<PiCubeFill />
					<span>Генерация 3Д моделей</span>
				</h1>
			</div>
		</div>
		<section className='section'>
			<h2>Список артикулов</h2>
			<div className='textarea-wrap'>
				<textarea
					className='textarea'
					onChange={event => validateVendorCodes(event.currentTarget.value)}
					placeholder='Введите артикуры через enter'
				/>
			</div>
			<div className='models-btn-wrap'>
				<Button
					title='Генерировать'
					onClick={doGenerate}
					className='btn btn-accent'
					icon={loading ? <LuLoader className='rotate'/> : <MdSendTimeExtension />}
				/>
			</div>

			{
				// вынести отдельно в компонент error
				data?.errors && <div className='error-wrap'>
					{
						data?.errors?.map(itm => <div key={itm.id}>
							<strong>{itm.vendorCode}</strong>: {itm.message}
						</div>)
					}
                </div>
			}
		</section>
		{
			loading
				? <Loader/>
				: data?.data  && <section className='section'>
					<h2>Результат</h2>
					<div className='models-head'>
						<div>
							<h4>Для кого модель (e-mail)</h4>
							<div className={`input-wrap ${!emailValid ? 'error' : ''}`}>
								<input
									onChange={(event => setEmail(event.currentTarget.value))}
									onBlur={() => setEmailValid(email == emailForInternalUse ? true : EMAIL_REGEXP.test(email))}
									defaultValue={email}
								/>
							</div>
						</div>
						<Button
							title='Скачать всё'
							onClick={downloadAll}
							className='btn btn-secondary'
							icon={<MdDownload/>}
						/>
					</div>
					<div className='table-wrap'>
						<table className='table'>
							<thead>
							<tr>
								<th>Артикул</th>
								<th className='center'>Полочный остаток</th>
								<th className='center'>Общее кол-во</th>
								<th className='center'>Цена</th>
								<th className='center'>Скачать</th>
							</tr>
							</thead>
							<tbody>
							{
								data?.data?.map(itm => <tr key={itm.vendorCode}>
									<td>{itm.vendorCode}</td>
									<td className='center'>{itm.freeQuantity}</td>
									<td className='center'>{itm.allQuantity}</td>
									<td className='center'>{itm.price}</td>
									<td className='center download'>
										{
											loadingVendorCodes.includes(itm.vendorCode)
												? <span className='mini-loader'/>
												: <MdDownload onClick={() => downloadModel(itm.vendorCode)}/>
										}

									</td>
								</tr>)
							}
							</tbody>
						</table>
					</div>
				</section>
		}
	</>
}

export default ModelsPage
