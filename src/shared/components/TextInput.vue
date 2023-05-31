<template>
  <BaseInput
    :id="id"
    v-model="model"
    :label="label"
    :placeholder="placeholder"
    type="text"
    required />
</template>

<script lang="ts" setup>
import BaseInput from "@/shared/components/BaseInput.vue";
import { computed } from "vue";

interface Props {
	id: string;
	label: string;
	placeholder: string;
	modelValue: string;
}

interface Events {
	(e: 'update:modelValue', v: string): void;
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const model = computed({
	get: () => props.modelValue,
  set: (value: string) => emits('update:modelValue', value)
})

</script>
