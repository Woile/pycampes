import "./styles/styles.scss";

const accordionBehavior = () => {
  const accordionLinks = document.getElementsByClassName("faq-link");

  Array.prototype.map.call(accordionLinks, accordionLink => {
    const target = accordionLink.getAttribute("data-target");
    accordionLink.onclick = () => {
      const accordionBlock = document.getElementById(target);
      if (accordionBlock.classList.contains("show")) {
        accordionBlock.classList.remove("show");
      } else {
        accordionBlock.classList.add("show");
      }
    };
  });
};

const addMapWithMarker = () => {
  const L = window.L;
  if (!L) {
    return;
  }
  let map = L.map("mapid");
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const target = L.latLng("41.958312", "2.775938");

  // Set map's center to target with zoom 14.
  map.setView(target, 16);

  // Place a marker on the same location.
  L.marker(target).addTo(map);
};

accordionBehavior();
addMapWithMarker();

import GSheetReader from "g-sheets-api";
const options = {
  sheetId: "1H0dZ-NaYcgTyVwL3GK1cWE3pSH2R4hcsYdnSF9QIhmA",
  returnAllResults: true
};
GSheetReader(options, function(results) {
  for (let row of results.filter(function(row) {
    return row["autorizo que incluyan estos datos en la web de pycamp españa"]
      .toLowerCase()
      .includes("s");
  })) {
      if (!row['url del proyecto ']) {
          row['url del proyecto '] = "#projects";
      }
    document.getElementById("project-rows").innerHTML += `
  <tr>
    <td>
    <a href="${row['url del proyecto ']}" target="_blank">${row["nombre del proyecto "]}</a>
    </td>
    <td>
    ${row["descripción"]}
    </td>
       <td>
    ${row["requerimientos "]}
    </td>
    <td>
    ${row["nivel de conocimiento requerido con skill principal del proyecto"]}
    </td>
  </tr>
  `;
  }
});
