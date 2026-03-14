/* ===========================================================
   FORMS.JS — Form Validation
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.validated-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          field.classList.add('error');
          if (group) group.classList.add('has-error');
          valid = false;
        } else {
          field.classList.remove('error');
          if (group) group.classList.remove('has-error');
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            field.classList.add('error');
            if (group) group.classList.add('has-error');
            valid = false;
          }
        }
      });

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
        btn.style.background = '#25D366';
        btn.style.borderColor = '#25D366';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          form.reset();
        }, 4000);

        // Show success message
        const success = form.querySelector('.form-success');
        if (success) {
          success.style.display = 'flex';
          setTimeout(() => success.style.display = 'none', 4500);
        }
      }
    });

    // Live validation on blur
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', () => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          field.classList.add('error');
          if (group) group.classList.add('has-error');
        } else {
          field.classList.remove('error');
          if (group) group.classList.remove('has-error');
        }
      });

      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.classList.remove('error');
          const group = field.closest('.form-group');
          if (group) group.classList.remove('has-error');
        }
      });
    });
  });
});
