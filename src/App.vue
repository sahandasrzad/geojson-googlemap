<template>
  <div>
    <GoogleMap :geodata="geodata" />
    <List :convert="convert" />
  </div>
</template>

<script setup>
import GoogleMap from "./components/GoogleMap.vue";
import List from "./components/List.vue";
import { ref } from "vue";
let geodata = ref({ type: null, features: null });
const convert = (value) => {
  worker.postMessage({ data: value });
};

let worker = new Worker("../src/workers/example.worker.js", {
  type: "module",
});
worker.onmessage = function (e) {
  console.log("app.vue", e.data.result);
  geodata.value = {
    type: e.data.result.type,
    features: e.data.result.features,
  };
};
</script>
