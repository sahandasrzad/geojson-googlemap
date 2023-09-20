import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
self.addEventListener(
  "message",
  function (MessageEvent) {
    let xmlDoc = new DOMParser().parseFromString(
      MessageEvent.data.data,
      "text/xml"
    );
    let kml_behavior = kml(xmlDoc);
    self.postMessage({
      result: kml_behavior,
    });
  },
  false
);
