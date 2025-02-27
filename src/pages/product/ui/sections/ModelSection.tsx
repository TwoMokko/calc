import { FC, ReactNode, useState } from "react";
import { SelectCard } from "../../../../shared/ui/SelectCard.tsx";
import { domains } from "../../../../app/types/global.ts";
import { Button } from "../../../../shared/ui/Button.tsx";
import { MdDownload } from "react-icons/md";
import { LuLoader } from "react-icons/lu";
import { getStatusDownloadFileModel } from "../../../models/api/fetches.ts";

/* Все форматы, доступные для скачивания (хорошо бы бекенд присылал доступные форматы для данной модели) */
const formats = [
	'stp',
	'pdf',
	'm3d',
	'cdw',
]

interface ModelSectionProps {
	vendorCode: string
}

export const ModelSection: FC<ModelSectionProps> = ({vendorCode}): ReactNode => {
	/** Constants */
	const [format, setFormat] = useState<string>('stp')						// формат для скачивания, по умолчанию stp
	const [loading, setLoading] = useState<boolean>(false)					// флаг для отображения компонента загрузки
	const currentVendorCode: string = vendorCode.toLowerCase()							// артикул в верхнем регистре (можно принимать пропс уже в таком виде?)
	// console.log(vendorCode)
	// const currentVendorCode: string = 'cmc-8m-8r'

	/** Constants (functions) */
	/* Скачивание модели */
	const downloadModel = () => {
		setLoading(true)
		getStatusDownloadFileModel(currentVendorCode, () => {
			const anchor: HTMLAnchorElement = document.createElement('a')
			anchor.href = `${domains.MODELS}/api/v1/models/load/${currentVendorCode}?format=${format}`
			anchor.download = `${currentVendorCode}.${format}`
			anchor.click()
			setLoading(false)
		})
	}

	/** Build DOM */
	return <section className='section'>
		<div className='download-wrap'>
			<div className='download-title'>Выберите формат</div>
			<div className='download-content'>
				<div>
					<SelectCard
						option={'model3d'}
						values={formats}
						value={'stp'}
						onChange={(value) => setFormat(value)}
						highlight={formats}
						not={{
							color: true,
							search: true,
							reset: true
						}}
					/>
				</div>
				<div>
					<Button
						title={'Скачать'}
						onClick={downloadModel}
						className='btn btn-accent'
						icon={loading ? <LuLoader className='rotate'/> : <MdDownload/>}
					/>
				</div>
			</div>
		</div>
	</section>
}