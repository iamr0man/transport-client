<template>
    <form
        class="mx-auto w-1/2"
        @submit.prevent="emits('submit')"
    >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <NumberInput id="mileage" v-model="transportData.mileage" label="Mileage" placeholder="1000" />
            <TextInput id="model" v-model="transportData.model" label="Model" placeholder="Cla" />
            <TextInput id="licensePlate" v-model="transportData.licensePlate" label="License Plate" placeholder="KA0770KA" />
            <BaseSelect id="status" v-model="transportData.status" disabled :options="statusOptions" label="Select status" placeholder="Status" />
            <BaseSelect id="type" v-model="transportData.type" class="col-span-2" :options="typeOptions" label="Select type" placeholder="Transport type" />
            <DatePicker v-model="transportData.purchaseDate" title="Purchase date" />
        </div>

        <BaseButton
            :loading="loading"
            :disabled="loading"
            type="submit"
        >
            Submit
        </BaseButton>
    </form>
</template>

<script lang="ts" setup>
import TextInput from "@/shared/components/TextInput.vue";
import NumberInput from "@/shared/components/NumberInput.vue";
import BaseSelect from "@/shared/components/BaseSelect.vue";

import { ITransports } from "@/modules/transport/types/transports.types.ts";

import BaseButton from "@/shared/components/BaseButton.vue";
import DatePicker from "@/shared/components/DatePicker.vue";
import { computed } from "vue";

interface Props {
    modelValue: Omit<ITransports.ModelWithRelation, 'id'>;
    loading: boolean;
}

interface Events {
    (e: 'submit'): void
    (e: 'update:modelValue', v: Omit<ITransports.ModelWithRelation, 'id'>): void
}

const props = defineProps<Props>();

const emits = defineEmits<Events>()

const transportData = computed({
    get: () => props.modelValue,
    set: (value: Omit<ITransports.ModelWithRelation, 'id'>) => emits('update:modelValue', value)
})

const statusOptions = Object.values(ITransports.Enum.Status).map(status => ({ value: status as string, text: status as string }))
const typeOptions = Object.values(ITransports.Enum.Type).map(type => ({ value: type as string, text: type as string }))
</script>