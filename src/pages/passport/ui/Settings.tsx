import { Button } from "../../../shared/ui/Button.tsx";
import {useState} from "react";
import {TbReload} from "react-icons/tb";

interface SettingsProps {

}

export const Settings = ({}: SettingsProps) => {
	const [process, setProcess] = useState<boolean>(false)

	return <aside>
		<div>Настройки для выбранных изделий</div>
		<div>
			<div>
				<div>Реквизиты</div>
				<div>
					<div>Без даты</div>
					<div>Без подписаанта</div>
				</div>
			</div>
			<div>
				<div>Свойства</div>
				<div>
					<div>Калькулятор - БД</div>
					<div>Без подписанта</div>
				</div>
			</div>
			<div>Метки</div>
			<div>Редактирование свойств</div>
		</div>

		{process
			? <div>
				<div>
					Формируется:
					<span>6. ACOM-8M-8G</span>
				</div>
				<div>
					<div>
						<div>Ищется шаблон</div>
						<div>Прогресс - 36%</div>
					</div>
					<div></div>
				</div>
			</div>
			: <div>
				<Button title={'Подготовить ПС, РЭ, Серт/Декл'} onClick={() => setProcess(true)}
						className='btn-accent'/>
				<div>По выбранным</div>
			</div>
		}

		<div>
			<div>Проблемы</div>
			<div>
				<div>2. H-SSA-8N-10K ‍— свойства не найдены</div>
				<div>3. CTA-6-F53 ‍— недостаточно свойств</div>
			</div>
		</div>
		<div>
			Для‍ обработки нового счёта нажмите <TbReload /> вверху или‍ перезагрузите страницу
		</div>
	</aside>
};
