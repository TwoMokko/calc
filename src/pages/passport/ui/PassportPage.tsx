import { ReactNode } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdFolder } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import './passportPage.css'
import TablePass from "./TablePass.tsx";
import Settings from "./Settings.tsx";

const PassportPage = (): ReactNode => {
	return <>
		<div className='calc-top-wrap'>
			<div className='calc-top'>
				<h1>
					<AiFillSafetyCertificate/>
					<span>Генерация технических паспортов</span>
				</h1>
			</div>
			<div className='pass-top'>
				<div className='reload'>Счет <span>1546488 (2024)</span> <TbReload /></div>
				<div className='pass-top-folder'>
					<div>Папка‍ по‍ счёту<MdFolder /></div>
					<span>Печать в‍ отгрузку:</span>
					<div>для‍ ручной‍ подписи <FaFile/></div>
					<span>/</span>
					<div>с готовой‍ подписью <FaFilePen/></div>
				</div>
			</div>
		</div>


		<section className='section content'>
			<TablePass />
			<Settings />
		</section>
	</>
}

export default PassportPage
