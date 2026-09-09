# KW

<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/7377e42b-f1cc-4981-be41-5520279e8a79" />

Zeigt die aktuelle Kalenderwoche (ISO 8601) und ihre Datumsrange. Statische Seite,
keine Abhängigkeiten, kein Build-Step. Image: **2,8 MB** (busybox httpd).


## Routes

| Pfad | Zeigt |
|------|-------|
| `/`  | aktuelle KW |
| `/7` | KW 7 — im aktuellen Jahr, falls noch nicht vorbei, sonst im nächsten |


## Lokal

```sh
node test.mjs                        # Wochenlogik prüfen
docker build -t kw . && docker run --rm -p 8080:80 kw
```

