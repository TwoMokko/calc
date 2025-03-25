import React from "react";

export type sidebarLink = {
	title: string;
	route: string;
	icon: React.ReactNode;
	isDisabled?: boolean; // для тех, которые надо скрыть
}