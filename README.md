# KW

Zeigt die aktuelle Kalenderwoche (ISO 8601) und ihre Datumsrange. Statische Seite,
keine Abhängigkeiten, kein Build-Step.

## Routes

| Pfad | Zeigt |
|------|-------|
| `/`  | aktuelle KW |
| `/7` | KW 7 — im aktuellen Jahr, falls noch nicht vorbei, sonst im nächsten |

Ungültige Werte (`/0`, `/54`, `/foo`) fallen auf die aktuelle KW zurück.

## Lokal

```sh
node test.mjs                        # Wochenlogik prüfen
docker build -t kw . && docker run --rm -p 8080:80 kw
```

Ohne Docker: `python3 -m http.server 8080` — nicht per `file://` öffnen,
ES-Module brauchen HTTP. Routes wie `/7` gehen nur hinter nginx.

## Homelab

```sh
docker compose up -d      # → http://<host>:8080
```

Image: `ghcr.io/thiemotorres/kw:latest` (amd64 + arm64), gebaut per GitHub Actions
bei jedem Push auf `main`.

**Einmalig nach dem ersten Push:** das GHCR-Package auf public stellen
unter https://github.com/users/thiemotorres/packages/container/kw/settings, sonst braucht der
Homelab-Host ein `docker login ghcr.io`.
