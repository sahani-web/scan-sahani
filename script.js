// script.js
document.addEventListener('DOMContentLoaded', () => {
    const qrButton = document.getElementById('scanBtn');
    const qrContainer = document.getElementById('qr-scanner');
  
    qrButton.addEventListener('click', () => {
      qrButton.disabled = true;
      const html5QrcodeScanner = new Html5Qrcode("qr-scanner");
      html5QrcodeScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        decodedText => {
          document.getElementById('qrResult').value = decodedText;
          // capture scan time
          document.getElementById('scanTimestamp').value = new Date().toISOString();
          html5QrcodeScanner.stop().then(() => qrContainer.innerHTML = '');
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              document.getElementById('latitude').value  = pos.coords.latitude.toFixed(6);
              document.getElementById('longitude').value = pos.coords.longitude.toFixed(6);
            });
          }
        },
        err => console.warn(err)
      ).catch(console.error);
    });
  
    document.getElementById('dataForm').addEventListener('submit', e => {
      e.preventDefault();
      const data = {
        branch:     document.getElementById('branch').value,
        project:    document.getElementById('project').value,
        code:       document.getElementById('branchCode').value,
        qr:         document.getElementById('qrResult').value,
        lat:        document.getElementById('latitude').value,
        lng:        document.getElementById('longitude').value,
        timestamp:  document.getElementById('scanTimestamp').value
      };
      sessionStorage.setItem('formData', JSON.stringify(data));
      window.location.href = 'display.html';
    });
  });
  