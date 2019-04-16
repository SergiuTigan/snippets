function initMap() {
  const loc = { lat: 46.777616, lng: 23.596841 };
  const map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: loc
  });
  const marker = new google.maps.Marker({ position: loc, map: map });
}
