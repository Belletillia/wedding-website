// ============================================
// Wedding Website — Shared Behaviour
// ============================================

// ---- Mobile nav toggle ----
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
  }

  // ---- Countdown timer ----
  var WEDDING_DATE = '2027-06-26T15:00:00';

  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var target = new Date(WEDDING_DATE).getTime();

    var render = function () {
      var now = new Date().getTime();
      var diff = target - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p class="text-center">We are married!</p>';
        clearInterval(timer);
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      var units = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: seconds }
      ];

      countdownEl.innerHTML = units.map(function (u) {
        return '<div class="unit"><span class="number">' + u.value + '</span><span class="label">' + u.label + '</span></div>';
      }).join('');
    };

    render();
    var timer = setInterval(render, 1000);
  }

  // ---- RSVP form: show/hide extra fields based on attendance ----
  var attendingRadios = document.querySelectorAll('input[name="attending"]');
  var conditionalFields = document.getElementById('attending-details');

  if (attendingRadios.length && conditionalFields) {
    var updateVisibility = function () {
      var selected = document.querySelector('input[name="attending"]:checked');
      if (selected && selected.value === 'yes') {
        conditionalFields.style.display = 'block';
      } else {
        conditionalFields.style.display = 'none';
      }
    };

    attendingRadios.forEach(function (radio) {
      radio.addEventListener('change', updateVisibility);
    });

    updateVisibility();
  }

  // ---- Carpool form: show offering/needing fields based on role ----
  var carpoolRadios = document.querySelectorAll('input[name="carpool_role"]');
  var offeringDetails = document.getElementById('offering-details');
  var needingDetails = document.getElementById('needing-details');

  if (carpoolRadios.length) {
    var updateCarpoolVisibility = function () {
      var selected = document.querySelector('input[name="carpool_role"]:checked');
      var role = selected ? selected.value : null;

      if (offeringDetails) {
        offeringDetails.style.display = role === 'offering' ? 'block' : 'none';
      }
      if (needingDetails) {
        needingDetails.style.display = role === 'needing' ? 'block' : 'none';
      }
    };

    carpoolRadios.forEach(function (radio) {
      radio.addEventListener('change', updateCarpoolVisibility);
    });

    updateCarpoolVisibility();
  }

  // ---- Carpool form: two-step flow ----
  var carpoolStep1 = document.getElementById('carpool-step-1');
  var carpoolStep2 = document.getElementById('carpool-step-2');
  var carpoolNextBtn = document.getElementById('carpool-next');
  var carpoolBackBtn = document.getElementById('carpool-back');

  if (carpoolStep1 && carpoolStep2 && carpoolNextBtn) {
    var carpoolNameInput = document.getElementById('carpool_name');
    var carpoolPhoneCodeInput = document.getElementById('carpool_phone_code');
    var carpoolPhoneInput = document.getElementById('carpool_phone');

    carpoolNextBtn.addEventListener('click', function () {
      if (!carpoolNameInput.checkValidity()) {
        carpoolNameInput.reportValidity();
        return;
      }
      if (!carpoolPhoneCodeInput.checkValidity()) {
        carpoolPhoneCodeInput.reportValidity();
        return;
      }
      if (!carpoolPhoneInput.checkValidity()) {
        carpoolPhoneInput.reportValidity();
        return;
      }
      var roleSelected = document.querySelector('input[name="carpool_role"]:checked');
      if (!roleSelected) {
        carpoolRadios[0].reportValidity();
        return;
      }

      carpoolStep1.style.display = 'none';
      carpoolStep2.style.display = 'block';
      updateCarpoolVisibility();
      carpoolStep2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (carpoolBackBtn) {
      carpoolBackBtn.addEventListener('click', function () {
        carpoolStep2.style.display = 'none';
        carpoolStep1.style.display = 'block';
        carpoolStep1.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
});
