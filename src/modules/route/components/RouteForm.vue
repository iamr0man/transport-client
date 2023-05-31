<template>
    <form
        class="mx-auto max-w-2xl"
        @submit.prevent="emits('submit')"
    >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <TextInput id="cityStart" v-model="routeData.cityStart" label="City start" placeholder="Kyiv" />
            <TextInput id="cityEnd" v-model="routeData.cityEnd" label="City end" placeholder="Odessa" />
            <NumberInput id="distanceBetweenCities" v-model="routeData.distanceBetweenCities" label="Distance between cities" placeholder="477" />
            <BaseSelect id="status" v-model="routeData.status" :options="statusOptions" label="Select status" placeholder="Status" />
            <DatePicker v-model="routeData.sendingDate" title="Sending date" />
            <DatePicker v-model="routeData.deliveryDate" title="Delivery date" />
            <NumberInput id="revenue" v-model="routeData.revenue" label="Revenue" placeholder="100000$" />
            <BaseSelect id="transportType" v-model="routeData.transportType" :options="transportTypeOptions" label="Select transport type" placeholder="Transport type" />
            <BaseSelect id="transportId" v-model="routeData.transportId" class="col-span-2" :options="transportOptions" label="Select transport" placeholder="Transport" />
        </div>

        <BaseButton :loading="loading" :disabled="loading || !requiredFieldAreFilled" type="submit">Submit</BaseButton>
    </form>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";

import TextInput from "@/shared/components/TextInput.vue";
import NumberInput from "@/shared/components/NumberInput.vue";
import BaseSelect from "@/shared/components/BaseSelect.vue";

import { IRoutes } from "@/modules/route/types/route.types.ts";
import { ITransports } from "@/modules/transport/types/transports.types.ts";

import BaseButton from "@/shared/components/BaseButton.vue";
import DatePicker from "@/shared/components/DatePicker.vue";

interface Props {
    modelValue: Omit<IRoutes.RawModelWithRelation, 'id'>;
    freeTransports: ITransports.Model[];
    loading: boolean;
}

interface Events {
    (e: 'submit'): void;
    (e: 'update:modelValue', value: Omit<IRoutes.RawModelWithRelation, 'id'>): void;
}

const props = defineProps<Props>()

const emits = defineEmits<Events>()

const statusOptions = Object.values(IRoutes.Enum.Status).map(status => ({ value: status as string, text: status as string }))
const transportTypeOptions = Object.values(ITransports.Enum.Type).map(type => ({ value: type as string, text: type as string}))

const routeData = computed({
    get: () => props.modelValue,
    set: (value: Omit<IRoutes.RawModelWithRelation, 'id'>) => emits('update:modelValue', value)
})

const requiredFieldAreFilled = computed(() => {
    if (!routeData.value) {
        return false;
    }

    const { status, transportType, transportId } = routeData.value

    return status && transportType && transportId
})

const transportOptions = computed(() => {
    const options = [...props.freeTransports];
    const isTypeSame = routeData.value.transport && routeData.value.transport.type === routeData.value.transportType

    if (isTypeSame && routeData.value.transport) {
        options.push(routeData.value.transport)
    }

    return options
        .map(transport => ({
            value: transport.id,
            text: `${transport.licensePlate} | ${transport.model} | ${transport.mileage}`
        }))
})

watch(() => routeData.value.transportType, () => {
    routeData.value = {
        ...routeData.value,
        transportId: null
    };
})
</script>