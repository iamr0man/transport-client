<template>
    <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
<!--            cityStart: string | null-->
<!--            cityEnd: string | null-->
<!--            distanceBetweenCities: number | null-->
<!--            sendingDate: Date | null-->
<!--            deliveryDate: Date | null-->
<!--            status: Enum.Status;-->
<!--            transportType: ITransports.Enum.Type;-->
<!--            revenue: number | null-->
<!--            transportId: number-->
            <TextInput id="cityStart" label="City start" placeholder="Kyiv" />
            <TextInput id="cityEnd" label="City end" placeholder="Odessa" />
            <NumberInput id="distanceBetweenCities" label="Distance between cities" placeholder="477" />
            <BaseSelect options="options" label="" placeholder=""
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

</template>

<script lang="ts" setup>

import TextInput from "@/shared/components/TextInput.vue";
import NumberInput from "@/shared/components/NumberInput.vue";
import BaseSelect from "@/shared/components/BaseSelect.vue";
</script>