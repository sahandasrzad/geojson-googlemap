<template>
  <div>
    <div ref="mapTemplateRef" id="map"></div>
  </div>
</template>

<script setup>
import DeckGL, { IconLayer } from "deck.gl";
import { Loader } from "@googlemaps/js-api-loader";
import { GeoJsonLayer } from "deck.gl";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  geodata: {
    default: null,
    required: true,
  },
});
watch(
  () => props.geodata.features,
  (n, o) => {
    console.log("props.geodata.features", typeof props.geodata.features[0]);
    let senddata = [];
    // senddata = props.geodata.features.filter(
    //   (item) => item.geometry.type !== "Polygon"
    // );
    // console.log("props.geodata.features", [0]);
    // props.geodata.features.forEach((element) => {
    //   console.log(element);
    //   if (!element.geometry.type === "Polygon") {
    //     senddata.push(element);
    //   }
    //   console.log("element.geometry.type", element.geometry.type);
    // });
    overlay(props.geodata.features);
  }
);
const mapTemplateRef = ref(null);
let map = ref(null);
const loader = new Loader({
  apiKey: "AIzaSyCsuHKQe4gZH_MMHr23uqukStCxJxQ-NoA",
  version: "weekly",
  libraries: ["places"],
});

const mapOptions = {
  center: {
    lat: 29.92279689975199,
    lng: -97.78043453901203,
  },
  zoom: 15,
};
onMounted(() => {
  initMap();
});
const initMap = () => {
  loader
    .load()
    .then((google) => {
      map.value = new google.maps.Map(mapTemplateRef.value, mapOptions);
    })
    .catch((e) => {
      // do something
    });
};

const overlay = async (data) => {
  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };

  const overlay = new GoogleMapsOverlay({
    layers: [
      new IconLayer({
        id: "icon-layer",
        data,
        pickable: true,
        iconAtlas: (d) => d.properties.icon,
        iconMapping: ICON_MAPPING,
        getIcon: (d) => "marker",
        sizeUnits: "pixels",
        sizeScale: 4,
        getPosition: (d) => d.geometry.coordinates,
        getSize: (d) => 5,
        // getColor: (d) => [240, 120, 0],
      }),
      new GeoJsonLayer({
        id: "geojson",
        data,
        pickable: true,
        stroked: false,
        filled: true,
        extruded: true,
        getFillColor: [160, 160, 180, 200],
        _subLayerProps: {
          points: {
            type: IconLayer,
            iconAtlas: (d) => d.properties.icon,
            iconMapping: ICON_MAPPING,
            getIcon: (d) => d.properties.icon,
            sizeUnits: "pixels",
            sizeScale: 4,
            getColor: [240, 120, 0],
            getSize: (d) => 5,
          },
        },
      }),
    ],
  });

  overlay.setMap(map.value);
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
