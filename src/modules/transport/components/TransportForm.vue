<template>
    <form
        class="mx-auto w-1/2"
        @submit.prevent="emits('submit')"
    >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <NumberInput v-model="transportData.mileage" id="mileage" label="Mileage" placeholder="1000" />
            <TextInput v-model="transportData.model" id="model" label="Model" placeholder="Cla" />
            <TextInput v-model="transportData.licensePlate" id="licensePlate" label="License Plate" placeholder="KA0770KA" />
            <BaseSelect v-model="transportData.status" id="status" disabled :options="statusOptions" label="Select status" placeholder="Status" />
            <BaseSelect class="col-span-2" v-model="transportData.type" id="type" :options="typeOptions" label="Select type" placeholder="Transport type" />
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

interface Props {
    transportData: Omit<ITransports.ModelWithRelation, 'id'>;
    loading: boolean;
}

interface Events {
    (e: 'submit'): void
}

defineProps<Props>()

const emits = defineEmits<Events>()

const statusOptions = Object.values(ITransports.Enum.Status).map(status => ({ value: status as string, text: status as string }))
const typeOptions = Object.values(ITransports.Enum.Type).map(type => ({ value: type as string, text: type as string }))
</script>