<template>
  <div>
    <!-- <div v-for="item in list" :key="item.url"> -->
    <button class="btn" @click.prevent="click">convert to geojson</button>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { kml } from "@tmcw/togeojson";
let file = null;
// const list = ref([]);
// const file = { url: "", geo: null };
const props = defineProps(["convert"]);
const click = () => {
  props.convert(file);
};
const getdata = () => {
  fetch("http://localhost:8888/public/kml/2_exodus.kml")
    .then((response) => {
      // file.url = response.url;

      return response.text();
    })
    .then((xml) => {
      file = xml;
      // file.geo = kml(new DOMParser().parseFromString(xml, "text/xml"));
    })
    .catch((e) => console.error(e));
  // list.value.push(file);
  // console.log(list.value);
};
onMounted(() => {
  getdata();
});
</script>
<!-- <script type="module">
import { kml } from "https://unpkg.com/@tmcw/togeojson?module";

fetch("http://localhost:8888/public/kml/2_exodus.kml")
  .then(function (response) {
    return response.text();
  })
  .then(function (xml) {
    console.log(kml(new DOMParser().parseFromString(xml, "text/xml")));
  });
</script> -->
<style scoped>
.btn {
  margin: 10px;
  background-color: rgb(14, 68, 193);
  color: white;
  padding: 8px 14px;
}
</style>
