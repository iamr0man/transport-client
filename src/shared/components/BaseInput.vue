<template>
  <div>
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="placeholder"
      :required="required"
      @input="input"
    >
  </div>
</template>

<script lang="ts" setup>
interface Props {
	id: string;
	label: string;
	placeholder: string;
	required: boolean;
	type: string;
	modelValue: string | number;
}

interface Events {
	(e: 'update:modelValue', v: string): void;
}

defineProps<Props>()
const emits = defineEmits<Events>()

const input = (e: Event) => {
	emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
