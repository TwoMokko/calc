import { PiCubeFill } from "react-icons/pi";
import { Button } from "../../../shared/ui/Button.tsx";
import { useState } from "react";
// import { getDataForTableDownload } from "../api/fetches.ts";
import { dataForTableDownLoadModelsItem } from "../config/types.ts";
import {LuLoader} from "react-icons/lu";
import {MdDownload, MdSendTimeExtension} from "react-icons/md";
import Loader from "../../../widgets/Loader/Loader.tsx";

export const ModelsPage = () => {
	const [data, setData] = useState<dataForTableDownLoadModelsItem[]>()
	const [vendorCodes, setVendorCodes] = useState<string[]>()
	const [loading, setLoading] = useState<boolean>(false)
	const [email, setEmail] = useState<string>('Для внутреннего использования')

	const doSearch = async () => {
		console.log('do search', vendorCodes)
		setLoading(true)
		setTimeout(() => {
			setData([
				{
					vendorCode: 'string',
					freeQuantity: 'string',
					allQuantity: 'string',
				},
				{
					vendorCode: 'string1',
					freeQuantity: 'string1',
					allQuantity: 'string1',
				},
				{
					vendorCode: 'string2',
					freeQuantity: 'string2',
					allQuantity: 'string2',
				},
			])
			setLoading(false)
		}, 1000)
		// setData(await getDataForTableDownload(vendorCodes ?? []))
	}

	const validateVendorCodes = (value: string) => {
		const vendorCodesAll = value.split(/\r?\n/)
		const vendorCodesSort: string[] = []

		vendorCodesAll.map(itm => {
			if (itm && !vendorCodesSort.includes(itm)) vendorCodesSort.push(itm)
		})

		setVendorCodes(vendorCodesSort)
	}

	const validateEmail = (value: string) => {
		// проверка на емайл

		setEmail(value)
	}

	const downloadAll = () => {
		console.log('all download')
	}

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
					onClick={doSearch}
					className='btn btn-accent'
					icon={loading ? <LuLoader/> : <MdSendTimeExtension />}
				/>
			</div>
		</section>
		{
			loading
				? <Loader />
				: data && <section className='section'>
					<h2>Результат</h2>
					<div className='models-head'>
						<div>
							<h4>Для кого модель (e-mail)</h4>
							<div className='input-wrap'>
								<input
									onChange={(event => validateEmail(event.currentTarget.value))}
									defaultValue={email}
								/>
							</div>
						</div>
						<Button
							title='Скачать всё'
							onClick={downloadAll}
							className='btn btn-secondary'
							icon={<MdDownload />}
						/>
					</div>
					<div className='table-wrap'>
						<table className='table'>
							<thead>
								<tr>
									<th>Артикул</th>
									<th>Полочный остаток</th>
									<th>Общее кол-во</th>
									<th>Скачать</th>
									<th>Статус загрузки</th>
								</tr>
							</thead>
							<tbody>
							{
								data?.map(itm => <tr>
									<td>{itm.vendorCode}</td>
									<td>{itm.freeQuantity}</td>
									<td>{itm.allQuantity}</td>
									<td className='download'>
										<MdDownload />
									</td>
									<td></td>
								</tr>)
							}
							</tbody>
						</table>
					</div>
				</section>
		}
	</>
};