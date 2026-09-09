# KW

Zeigt die aktuelle Kalenderwoche (ISO 8601) und ihre Datumsrange. Statische Seite,
keine Abhängigkeiten, kein Build-Step. Image: **2,8 MB** (busybox httpd).

Die Karte ist 80 % breit auf Mobil, 33 % ab 768px — alles darin skaliert über die
eine CSS-Variable `--w` in `main`. Farbe von Ring und Zahl: `--grad-a` / `--grad-b`
in `:root` (Neon Pink als Default, Neon Grün als Kommentar daneben).

## Routes

| Pfad | Zeigt |
|------|-------|
| `/`  | aktuelle KW |
| `/7` | KW 7 — im aktuellen Jahr, falls noch nicht vorbei, sonst im nächsten |

`/7` redirected auf `/7/` (busybox httpd kann nicht rewriten, jede Woche liegt als
Verzeichnis im Image). Gültig ist `1`–`53`, alles andere gibt ein echtes 404.

## Lokal

```sh
node test.mjs                        # Wochenlogik prüfen
docker build -t kw . && docker run --rm -p 8080:80 kw
```

Ohne Docker: `python3 -m http.server 8080` — zeigt nur `/`, die Wochen-Routes
brauchen den Container. Nicht per `file://` öffnen, ES-Module brauchen HTTP.

## Homelab

```sh
docker compose up -d      # → http://<host>:8080
```

Image: `ghcr.io/thiemotorres/kw:latest` (amd64 + arm64), gebaut per GitHub Actions
bei jedem Push auf `main`. httpd läuft als `nobody`, Healthcheck ist im Image
(alle 30 s `wget --spider` auf `/`) — Compose und Traefik übernehmen ihn automatisch.

**Einmalig nach dem ersten Push:** das GHCR-Package auf public stellen unter
https://github.com/users/thiemotorres/packages/container/kw/settings — sonst
braucht der Homelab-Host ein `docker login ghcr.io`.
