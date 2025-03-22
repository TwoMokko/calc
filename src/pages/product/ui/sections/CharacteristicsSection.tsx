import { FC, ReactNode } from "react";

interface CharacteristicsSectionProps {
	data: { [key: string]: string }
}

const CharacteristicsSection: FC<CharacteristicsSectionProps> = ({data}): ReactNode => {

	return <section className='section'>
		<h2>Характеристики</h2>
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

export default CharacteristicsSection
