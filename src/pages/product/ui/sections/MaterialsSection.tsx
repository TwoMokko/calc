import { FC, ReactNode } from "react";

interface MaterialsSectionProps {
	data: { [key: string]: string }
}

export const MaterialsSection: FC<MaterialsSectionProps> = ({data}): ReactNode => {

	return <section className='section'>
		<h2>Материалы</h2>
		{
			Object.entries(data).map(itm => {
				return <div key={itm[0]} className='table-list'>
					<div>{itm[0]}</div>
					<div>{itm[1]}</div>
				</div>
			})
		}
	</section>
}