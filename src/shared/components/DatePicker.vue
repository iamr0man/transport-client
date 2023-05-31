<template>
    <div class="relative max-w-sm">
        <div ref="datepickerRef" @click="setValue"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// Library has no ts support
// @ts-expect-error
import Datepicker from 'flowbite-datepicker/Datepicker';

interface Props {
    title: string;
    modelValue: Date | string;
}

interface Events {
    (e: 'update:modelValue', v: Date): void;
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const datepickerRef = ref<Datepicker | null>(null)

const setValue = () => {
    // @ts-ignore
    emits('update:modelValue', new Date(datepickerRef.value?.datepicker.dates[0]))
}

onMounted(() => {
    new Datepicker(datepickerRef.value, {
        title: props.title,
    });
    // @ts-ignore
    datepickerRef.value?.datepicker.setDate(new Date(props.modelValue).getTime())
})
</script>
