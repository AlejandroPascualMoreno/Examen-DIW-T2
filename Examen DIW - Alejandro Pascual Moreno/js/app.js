
const map = L.map('map').setView([36.7201600, -4.4203400], 16);


const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
tileLayer.addTo(map);


const plantilla = document.querySelector("template"); 
const contenedor = document.querySelector(".rutas");


fetch("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=c773ff20-ba3d-cf9e-1095-93f6fedc73c5")
  .then(response => response.json())
  .then(data => {
    
    data.forEach( function(el){
      
      const wrap = document.createElement("div");
      wrap.classList.add("border");
      
    
      const nuevaRuta = plantilla.content.cloneNode(true);
      nuevaRuta.querySelector("h3").textContent = el.properties.nombre;
      nuevaRuta.querySelector("p").textContent = el.properties.horario;
      nuevaRuta.querySelector(".direccion").textContent = el.properties.direccion;
      if (el.properties.telefono === "") {
        nuevaRuta.querySelector(".telefono").remove();
      } else {
        nuevaRuta.querySelector(".telefono").textContent = el.properties.telefono;
      }
      
     
      const x = el.properties.x;
      const y = el.properties.y;
      const marker = L.marker([x, y]).addTo(map);
      
      
      const label = `<p>${el.properties.direccion}</p><br/><h4>${el.properties.nombre}</h4>`;
      marker.bindPopup(label);
      
      
      wrap.appendChild(nuevaRuta);
      contenedor.appendChild(wrap);  
    });
  })
  .catch(err => {
    alert(`Hubo un error: ${err}`);
  });


