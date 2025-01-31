import { FC, ReactNode, useState } from "react";
import { SelectCard } from "../../../../shared/ui/SelectCard.tsx";
import { domains } from "../../../../app/types/global.ts";
import { Button } from "../../../../shared/ui/Button.tsx";
import { MdDownload } from "react-icons/md";
import { getFileModel } from "../../api/fetches.ts";
import { LuLoader } from "react-icons/lu";


interface ModelSectionProps {
	vendorCode: string
}

export const ModelSection: FC<ModelSectionProps> = ({vendorCode}): ReactNode => {
	const [format, setFormat] = useState<string>('stp')
	const [loading, setLoading] = useState<boolean>(false)
	const currentVendorCode: string = vendorCode.toLowerCase()
	// console.log(vendorCode)
	// const currentVendorCode: string = 'cmc-8m-8r'

	const downloadModel = () => {
		setLoading(true)
		getFileModel(currentVendorCode, () => {
			const anchor: HTMLAnchorElement = document.createElement('a')
			anchor.href = `${domains.MODELS}/api/v1/models/load/${currentVendorCode}`
			anchor.download = `${currentVendorCode}.${format}`
			anchor.click()
			setLoading(false)
		})
	}

	return <section className='section'>
		<div className='download-wrap'>
			<div className='download-title'>Выберите формат</div>
			<div className='download-content'>
				<div>
					<SelectCard
						option={'model3d'}
						values={['stp', 'pdf']}
						value={'stp'}
						onChange={(value) => setFormat(value)}
						highlight={['stp', 'pdf', 'sss']}
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
						icon={loading ? <LuLoader/> : <MdDownload/>}
					/>
				</div>
			</div>
		</div>
	</section>
}