<template>
    <div>
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
        <select v-model="model" v-bind="$attrs" :id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled>{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script lang="ts" setup>

import { computed } from "vue";

interface Option {
    value: string | number;
    text: string | number;
}

interface Props {
  id: string;
	label: string;
	placeholder: string;
  modelValue: number | string | null;
  options: Option[];
}

interface Events {
    (e: 'update:modelValue', v: number | string | null): void;
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const model = computed({
    get: () => props.modelValue,
    set: (value: number | string | null) => emits('update:modelValue', value)
})
</script>