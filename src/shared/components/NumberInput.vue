<template>
  <BaseInput
    :id="id"
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    type="number"
    required />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BaseInput from "@/shared/components/BaseInput.vue";

interface Props {
	id: string;
	label: string;
	placeholder: string;
	modelValue: number;
}

interface Events {
	(e: 'update:modelValue', v: number): void;
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const model = computed({
	get: () => props.modelValue,
	set: (value: number) => emits('update:modelValue', value)
})
</script>
