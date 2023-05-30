<template>
  <BaseInput
    :id="id"
    :label="label"
    :placeholder="placeholder"
    type="number"
    required />
</template>

<script lang="ts" setup>
import BaseInput from "@/shared/components/BaseInput.vue";

interface Props {
	id: string;
	label: string;
	placeholder: string;
}

const props = defineProps<Props>()
</script>
