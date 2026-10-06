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
  "Naprawy samochodów":
    "Np. Samochód nie odpala. Potrzebuję diagnostyki i naprawy.",
  "Naprawy rowerów":
    "Np. Przerzutki przeskakują podczas jazdy. Potrzebuję regulacji lub wymiany linki.",
  "Naprawy AGD i RTV":
    "Np. Pralka nie odprowadza wody. Potrzebuję diagnozy i naprawy.",
  Sprzątanie:
    "Np. Potrzebuję sprzątania mieszkańia po remoncie.",
  "Prace ogrodowe":
    "Np. Potrzebuję skoszenia trawy i przycięcia żywopłotu.",
  Przeprowadzki:
    "Np. Potrzebuję transportu mebli z Mokotówa na Pragę.",
  "Opieka nad zwierzętami":
    "Np. Potrzebuję opieki nad psem w weekend.",
  "Inna usługa":
    "Np. Opisz dokładnie, jakiej pomocy potrzebujesz."
};

const defaultDescriptionPlaceholder =
  "Np. Opisz problem, miejsce wykonania usługi i oczekiwany termin.";
const providerDescriptionPlaceholders = {
  "Naprawy samochodów":
    "Np. Oferuję diagnostykę, naprawy silnika, hamulców i zawieszenia.",
  "Naprawy rowerów":
    "Np. Oferuję regulację przerzutek, hamulców i podstawowe naprawy rowerów.",
  "Naprawy AGD i RTV":
    "Np. Oferuję diagnozę i naprawy pralek, lodówek oraz drobnego AGD.",
  Sprzątanie:
    "Np. Oferuję sprzątanie mieszkań po remoncie, generalne porządki i regularne sprzątanie.",
  "Prace ogrodowe":
    "Np. Oferuję koszenie trawy, pielęgnację ogrodu i przycinanie żywopłotów.",
  Przeprowadzki:
    "Np. Oferuję transport mebli, noszenie rzeczy i pomoc przy przeprowadzkach.",
  "Opieka nad zwierzętami":
    "Np. Oferuję spacery z psąmi, opiekę podczas wyjazdów i karmienie zwierząt.",
  "Inna usługa":
    "Np. Opisz konkretnie, jakie usługi oferujesz i dla kogo."
};

const defaultProviderDescriptionPlaceholder =
  "Np. Opisz zakres usług, doświadczenie i obszar działania.";


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
      `Dziękujemy. Testowe zlecenie w kategorii "${category}" zostało przygotowane. ` +
      "W MVP dane nie są jeszcze zapisywane.";

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
        `<h3>Podgląd testowej oferty</h3>` +
        `<p>Wykonawca: ${providerName}</p>`;
    }

    providerFormMessage.textContent =
      `Dziękujemy. Testowa oferta wykonawcy "${providerName}" została przygotowana. ` +
      "W MVP dane nie są jeszcze zapisywane.";

    providerForm.reset();
  });
}

// Wyszukiwanie kategorii
const searchForm = document.querySelector("#service-search-form");
const searchInput = document.querySelector("#service-search");
const searchClear = document.querySelector("#clear-service-search");
const searchSection = document.querySelector("#uslugi");
const searchCards = [...document.querySelectorAll("#uslugi .service-card")];

if (searchForm && searchInput && searchClear && searchSection) {
  const status = document.createElement("p");
  status.className = "message";
  status.setAttribute("role", "status");
  searchSection.append(status);

  const normalize = text => text.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l").trim();

  function filterCategories() {
    const query = normalize(searchInput.value);
    const words = query.split(/\s+/).filter(Boolean);
    let count = 0;

    searchCards.forEach(card => {
      const text = normalize(card.textContent);
      card.hidden = !words.every(word => text.includes(word));
      if (!card.hidden) count++;
    });

    searchClear.hidden = searchInput.value.length === 0;
    status.textContent = !query ? "" : count
      ? `Pasujące kategorie: ${count}.`
      : "Brak pasujących kategorii.";
  }

  searchInput.addEventListener("input", filterCategories);
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    filterCategories();
    searchInput.focus();
  });

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    filterCategories();
    searchInput.blur();
    searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  filterCategories();
}

// Rozwijane kategorie i wybór usługi
const categoryPanels = document.querySelectorAll(".service-details");

categoryPanels.forEach(panel => {
  panel.addEventListener("toggle", () => {
    if (!panel.open) return;
    categoryPanels.forEach(other => {
      if (other !== panel && other.open) other.open = false;
    });
  });
});

const chosenServiceNote = document.createElement("p");
chosenServiceNote.className = "field-help";
chosenServiceNote.setAttribute("role", "status");
if (categorySelect) categorySelect.after(chosenServiceNote);

document.querySelectorAll(".service-option").forEach(link => {
  link.addEventListener("click", () => {
    if (!categorySelect) return;
    categorySelect.value = link.dataset.serviceCategory;
    categorySelect.dispatchEvent(new Event("change"));
    chosenServiceNote.textContent =
      "Wybrana usługa: " + link.dataset.serviceName;
  });
});

if (categorySelect) {
  categorySelect.addEventListener("change", () => {
    chosenServiceNote.textContent = "";
  });
}

if (requestForm) {
  requestForm.addEventListener("reset", () => {
    chosenServiceNote.textContent = "";
  });
}
