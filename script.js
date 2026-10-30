const clubName = "Thunder Strikers Cricket Club";

const whatsappConfig = {
  number: "919876543210",
  message: "Hello Thunder Strikers Cricket Club! I would like to know about training, membership and match schedules.",
};

const defaultPlayers = [
  {
    id: 1,
    name: "Sample Batter 01",
    role: "Batter",
    specialty: "Top-order stroke play",
    batting: "Right-hand bat",
    bowling: "—",
    jersey: "#07",
    status: "Available for selection",
  },
  {
    id: 2,
    name: "Sample Batter 02",
    role: "Batter",
    specialty: "Power hitting",
    batting: "Left-hand bat",
    bowling: "—",
    jersey: "#18",
    status: "Training this week",
  },
  {
    id: 3,
    name: "Sample Bowler 01",
    role: "Bowler",
    specialty: "Fast-medium seam",
    batting: "Right-hand bat",
    bowling: "Fast-medium",
    jersey: "#11",
    status: "Match-ready",
  },
  {
    id: 4,
    name: "Sample Bowler 02",
    role: "Bowler",
    specialty: "Spin control",
    batting: "Right-hand bat",
    bowling: "Leg-spin",
    jersey: "#24",
    status: "Available for selection",
  },
  {
    id: 5,
    name: "Sample All-Rounder 01",
    role: "All-rounder",
    specialty: "Middle-over balance",
    batting: "Right-hand bat",
    bowling: "Off-spin",
    jersey: "#35",
    status: "Available for selection",
  },
  {
    id: 6,
    name: "Sample Wicket Keeper 01",
    role: "Wicket Keeper",
    specialty: "Glovework",
    batting: "Right-hand bat",
    bowling: "—",
    jersey: "#09",
    status: "Available for selection",
  },
];

const fixtures = [
  {
    title: "Sample Fixture 01",
    detail: "Thunder Strikers vs Sample Club A • Practice match",
    when: "Sat, 10 Aug • 07:30 PM",
    venue: "North Ridge Ground",
    status: "Upcoming",
  },
  {
    title: "Sample Fixture 02",
    detail: "Thunder Strikers vs Sample Club B • League fixture",
    when: "Wed, 14 Aug • 06:00 PM",
    venue: "City Stadium",
    status: "Upcoming",
  },
  {
    title: "Sample Fixture 03",
    detail: "Thunder Strikers vs Sample Club C • Friendly match",
    when: "Sun, 18 Aug • 08:00 AM",
    venue: "Harbor Turf",
    status: "Upcoming",
  },
];

const results = [
  {
    title: "Sample Result 01",
    detail: "Thunder Strikers vs Sample Club D • Demo result placeholder",
    when: "Fri, 02 Aug • 06:30 PM",
    venue: "Riverside Oval",
    status: "Result",
  },
  {
    title: "Sample Result 02",
    detail: "Thunder Strikers vs Sample Club E • Demo result placeholder",
    when: "Mon, 29 Jul • 07:00 PM",
    venue: "Lakeside Park",
    status: "Result",
  },
  {
    title: "Sample Result 03",
    detail: "Thunder Strikers vs Sample Club F • Demo result placeholder",
    when: "Sat, 20 Jul • 05:30 PM",
    venue: "Central Cricket Arena",
    status: "Result",
  },
];

const pointsTableData = [
  { team: "Thunder Strikers", played: 6, won: 4, lost: 2, nrr: "+1.264", points: 8 },
  { team: "Sample Side A", played: 6, won: 4, lost: 2, nrr: "+0.930", points: 8 },
  { team: "Sample Side B", played: 6, won: 3, lost: 3, nrr: "+0.510", points: 6 },
  { team: "Sample Side C", played: 6, won: 3, lost: 3, nrr: "+0.240", points: 6 },
  { team: "Sample Side D", played: 6, won: 2, lost: 4, nrr: "-0.210", points: 4 },
  { team: "Sample Side E", played: 6, won: 1, lost: 5, nrr: "-1.420", points: 2 },
];

const galleryItems = [
  "Sample practice session",
  "Training ground",
  "Club celebration",
  "Captain’s briefing",
  "Batting drill",
  "Fielding focus",
  "Team huddle",
  "Match day moment",
];

const playerStorageKey = "thunder-strikers-players";

let players = JSON.parse(localStorage.getItem(playerStorageKey)) || defaultPlayers;
let selectedRole = "All";
let searchTerm = "";
let sortKey = "points";
let sortDirection = "desc";

const playerGrid = document.querySelector("#playerGrid");
const playerSearch = document.querySelector("#playerSearch");
const roleFilter = document.querySelector("#roleFilter");
const resetPlayersBtn = document.querySelector("#resetPlayersBtn");
const modal = document.querySelector("#playerModal");
const playerForm = document.querySelector("#playerForm");
const modalTitle = document.querySelector("#modalTitle");
const whatsappButton = document.querySelector("#whatsappButton");
const yearNode = document.querySelector("#year");
const fixturesList = document.querySelector("#fixturesList");
const resultsList = document.querySelector("#resultsList");
const pointsTableBody = document.querySelector("#pointsTableBody");
const galleryGrid = document.querySelector("#galleryGrid");

function savePlayersList() {
  localStorage.setItem(playerStorageKey, JSON.stringify(players));
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function openPlayerEditor(playerId = null) {
  const formFields = playerForm.elements;
  modalTitle.textContent = playerId ? "Edit player profile" : "Add player profile";

  if (playerId) {
    const player = players.find((item) => item.id === playerId);
    if (!player) return;

    formFields.name.value = player.name;
    formFields.role.value = player.role;
    formFields.specialty.value = player.specialty;
    formFields.jersey.value = player.jersey;
    formFields.batting.value = player.batting;
    formFields.bowling.value = player.bowling;
    formFields.status.value = player.status;
    playerForm.dataset.editingId = String(playerId);
  } else {
    playerForm.reset();
    playerForm.dataset.editingId = "";
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closePlayerEditor() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  playerForm.reset();
  delete playerForm.dataset.editingId;
}

function renderPlayers() {
  const filteredPlayers = players.filter((player) => {
    const matchesRole = selectedRole === "All" || player.role === selectedRole;
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (!filteredPlayers.length) {
    playerGrid.innerHTML = '<div class="empty-state">No players match your search. Try a different name or role.</div>';
    return;
  }

  playerGrid.innerHTML = filteredPlayers
    .map(
      (player) => `
        <article class="player-card">
          <div class="player-card-header">
            <div class="player-avatar" aria-label="Player initials">${getInitials(player.name)}</div>
            <span class="role-pill">${player.role}</span>
          </div>

          <h3>${player.name}</h3>

          <div class="player-meta">
            <div><strong>Specialty:</strong> ${player.specialty || "Sample profile"}</div>
            <div><strong>Batting:</strong> ${player.batting || "—"}</div>
            <div><strong>Bowling:</strong> ${player.bowling || "—"}</div>
            <div><strong>Status:</strong> ${player.status || "Available"}</div>
          </div>

          <div class="card-actions">
            <span class="jersey-tag">Jersey ${player.jersey || "#00"}</span>
            <button class="edit-btn" type="button" data-player-id="${player.id}">Edit</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openPlayerEditor(Number(button.dataset.playerId));
    });
  });
}

function renderFixtureCards(list, targetElement) {
  if (!list.length) {
    targetElement.innerHTML = '<div class="empty-state">No sample fixtures available yet.</div>';
    return;
  }

  targetElement.innerHTML = list
    .map(
      (item) => `
        <article class="match-card">
          <div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
            <p>${item.when}</p>
            <p>${item.venue}</p>
          </div>
          <span class="match-status ${item.status === "Result" ? "result" : ""}">${item.status}</span>
        </article>
      `
    )
    .join("");
}

function renderStandings() {
  const rows = [...pointsTableData].sort((a, b) => {
    const first = Number.parseFloat(a[sortKey]?.toString().replace(/[^
-\d.]/g, "")) || 0;
    const second = Number.parseFloat(b[sortKey]?.toString().replace(/[^
-\d.]/g, "")) || 0;

    if (sortKey === "team") {
      return sortDirection === "asc"
        ? a.team.localeCompare(b.team)
        : b.team.localeCompare(a.team);
    }

    if (sortKey === "nrr") {
      return sortDirection === "asc"
        ? parseFloat(a.nrr) - parseFloat(b.nrr)
        : parseFloat(b.nrr) - parseFloat(a.nrr);
    }

    const mult = sortDirection === "asc" ? 1 : -1;
    return (first - second) * mult;
  });

  const ranking = rows.map((team, index) => ({ ...team, position: index + 1 }));

  pointsTableBody.innerHTML = ranking
    .map(
      (team) => `
        <tr>
          <td>${team.position}</td>
          <td>${team.team}</td>
          <td>${team.played}</td>
          <td>${team.won}</td>
          <td>${team.lost}</td>
          <td>${team.nrr}</td>
          <td>${team.points}</td>
        </tr>
      `
    )
    .join("");
}

function renderGallery() {
  galleryGrid.innerHTML = galleryItems
    .map(
      (item) => `
        <div class="gallery-item" aria-label="${item}">
          <span>${item}</span>
        </div>
      `
    )
    .join("");
}

function applyWhatsAppLink() {
  const whatsappUrl = `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(whatsappConfig.message)}`;
  whatsappButton.href = whatsappUrl;
}

function resetPlayersToDefault() {
  players = [...defaultPlayers];
  savePlayersList();
  renderPlayers();
}

playerSearch.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderPlayers();
});

roleFilter.addEventListener("change", (event) => {
  selectedRole = event.target.value;
  renderPlayers();
});

resetPlayersBtn.addEventListener("click", resetPlayersToDefault);

playerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(playerForm);
  const values = Object.fromEntries(formData.entries());

  const cleanedPlayer = {
    id: Number(playerForm.dataset.editingId || Date.now()),
    name: values.name.trim(),
    role: values.role,
    specialty: values.specialty.trim() || "Sample profile",
    batting: values.batting.trim() || "—",
    bowling: values.bowling.trim() || "—",
    jersey: values.jersey.trim() || "#00",
    status: values.status.trim() || "Available",
  };

  if (playerForm.dataset.editingId) {
    players = players.map((player) => (player.id === cleanedPlayer.id ? cleanedPlayer : player));
  } else {
    players = [cleanedPlayer, ...players];
  }

  savePlayersList();
  renderPlayers();
  closePlayerEditor();
});

modal.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-close='true']");
  if (trigger) {
    closePlayerEditor();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.tab;
    const panels = document.querySelectorAll(".tab-content");
    const tabs = document.querySelectorAll(".tab-btn");

    tabs.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const shouldShow = panel.id === targetId;
      panel.classList.toggle("is-active", shouldShow);
      panel.hidden = !shouldShow;
    });
  });
});

document.querySelectorAll(".sort-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;
    if (sortKey === key) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortKey = key;
      sortDirection = "desc";
    }
    renderStandings();
  });
});

renderPlayers();
renderFixtureCards(fixtures, fixturesList);
renderFixtureCards(results, resultsList);
renderStandings();
renderGallery();
applyWhatsAppLink();
