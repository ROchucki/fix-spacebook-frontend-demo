const message = document.querySelector("#message");
const buttons = document.querySelectorAll("[data-action]");

const requestForm = document.querySelector("#request-form");
const formMessage = document.querySelector("#form-message");
const categorySelect = document.querySelector("#category");
const description = document.querySelector("#description");

const providerButton = document.querySelector('[data-action="provider"]');
const providerSection = document.querySelector("#oferta-wykonawcy");
const providerForm = document.querySelector("#provider-form");
const providerFormMessage = document.querySelector("#provider-form-message");
const closeProviderFormButton = document.querySelector("#close-provider-form");
const providerCategorySelect = document.querySelector("#provider-category");
const providerDescription = document.querySelector("#provider-description");

const descriptionPlaceholders = {
  "Naprawy samochodow":
    "Np. Samochod nie odpala. Potrzebuje diagnostyki i naprawy.",
  "Naprawy rowerow":
    "Np. Przerzutki przeskakuja podczas jazdy. Potrzebuje regulacji lub wymiany linki.",
  "Naprawy AGD i RTV":
    "Np. Pralka nie odprowadza wody. Potrzebuje diagnozy i naprawy.",
  Sprzatanie:
    "Np. Potrzebuje sprzatania mieszkania po remoncie.",
  "Prace ogrodowe":
    "Np. Potrzebuje skoszenia trawy i przyciecia zywoplotu.",
  Przeprowadzki:
    "Np. Potrzebuje transportu mebli z Mokotowa na Prage.",
  "Opieka nad zwierzetami":
    "Np. Potrzebuje opieki nad psem w weekend.",
  "Inna usluga":
    "Np. Opisz dokladnie, jakiej pomocy potrzebujesz."
};

const defaultDescriptionPlaceholder =
  "Np. Opisz problem, miejsce wykonania uslugi i oczekiwany termin.";
const providerDescriptionPlaceholders = {
  "Naprawy samochodow":
    "Np. Oferuje diagnostyke, naprawy silnika, hamulcow i zawieszenia.",
  "Naprawy rowerow":
    "Np. Oferuje regulacje przerzutek, hamulcow i podstawowe naprawy rowerow.",
  "Naprawy AGD i RTV":
    "Np. Oferuje diagnoze i naprawy pralek, lodowek oraz drobnego AGD.",
  Sprzatanie:
    "Np. Oferuje sprzatanie mieszkan po remoncie, generalne porzadki i regularne sprzatanie.",
  "Prace ogrodowe":
    "Np. Oferuje koszenie trawy, pielegnacje ogrodu i przycinanie zywoplotow.",
  Przeprowadzki:
    "Np. Oferuje transport mebli, noszenie rzeczy i pomoc przy przeprowadzkach.",
  "Opieka nad zwierzetami":
    "Np. Oferuje spacery z psami, opieke podczas wyjazdow i karmienie zwierzat.",
  "Inna usluga":
    "Np. Opisz konkretnie, jakie uslugi oferujesz i dla kogo."
};

const defaultProviderDescriptionPlaceholder =
  "Np. Opisz zakres uslug, doswiadczenie i obszar dzialania.";


function updateDescriptionPlaceholder() {
  if (!categorySelect || !description) {
    return;
  }

  description.placeholder =
    descriptionPlaceholders[categorySelect.value] ||
    defaultDescriptionPlaceholder;
}

if (categorySelect && description) {
  updateDescriptionPlaceholder();
  categorySelect.addEventListener("change", updateDescriptionPlaceholder);
}

function updateProviderDescriptionPlaceholder() {
  if (!providerCategorySelect || !providerDescription) {
    return;
  }

  providerDescription.placeholder =
    providerDescriptionPlaceholders[providerCategorySelect.value] ||
    defaultProviderDescriptionPlaceholder;
}

if (providerCategorySelect && providerDescription) {
  updateProviderDescriptionPlaceholder();
  providerCategorySelect.addEventListener(
    "change",
    updateProviderDescriptionPlaceholder
  );
}

if (providerButton && providerSection) {
  providerButton.addEventListener("click", () => {
    providerSection.hidden = false;
    providerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (closeProviderFormButton && providerSection) {
  closeProviderFormButton.addEventListener("click", () => {
    if (providerForm) {
      providerForm.reset();
    }

    if (providerFormMessage) {
      providerFormMessage.textContent = "";
    }

    updateProviderDescriptionPlaceholder();
    providerSection.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!requestForm.checkValidity()) {
      requestForm.reportValidity();
      return;
    }

    const category = requestForm.elements.category.value;

    formMessage.textContent =
      `Dziekujemy. Testowe zlecenie w kategorii "${category}" zostalo przygotowane. ` +
      "W MVP dane nie sa jeszcze zapisywane.";

    requestForm.reset();
    updateDescriptionPlaceholder();
  });
}

if (providerForm) {
  providerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!providerForm.checkValidity()) {
      providerForm.reportValidity();
      return;
    }

    const providerName = providerForm.elements.providerName.value;
    const providerPreview = document.querySelector("#provider-preview");

    if (providerPreview) {
      providerPreview.hidden = false;
      providerPreview.innerHTML =
        `<h3>Podglad testowej oferty</h3>` +
        `<p>Wykonawca: ${providerName}</p>`;
    }

    providerFormMessage.textContent =
      `Dziekujemy. Testowa oferta wykonawcy "${providerName}" zostala przygotowana. ` +
      "W MVP dane nie sa jeszcze zapisywane.";

    providerForm.reset();
  });
}
