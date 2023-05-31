import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IStoreNotification } from "@/modules/notification/store/notification.types.ts";

export const useNotificationStore = defineStore('notification', () => {
	const show = ref(false);
	const message = ref('');
	const type = ref(IStoreNotification.Enum.Type.SUCCESS);

	const send = (msg: string) => {
		type.value = IStoreNotification.Enum.Type.SUCCESS;
		message.value = msg;
		show.value = true;

		setTimeout(() => show.value = false, 3000)
	};

	const sendError = (msg: string) => {
		type.value = IStoreNotification.Enum.Type.ERROR;
		message.value = msg;
		show.value = true;

		setTimeout(() => show.value = false, 3000)
	};

	return {
		show,
		message,
		type,
		send,
		sendError,
	};
});
