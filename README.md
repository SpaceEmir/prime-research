# 6n ± 1 — Primzahllabor

Deutsche Forschungswebseite mit öffentlichen Updates, Forschungswerten, exakten Bereichstests, öffentlichem Chat und passwortgeschütztem Admin-Bereich.

## Betrieb

Node >=22.13, `npm ci`, `npm run db:generate`, `npm run dev`. Deployment nutzt Vinext/Cloudflare Workers und eine persistente D1-Datenbank; `.openai/hosting.json` deklariert die Bindung `DB`. Migrationen in `drizzle/` vor Betrieb anwenden. `ADMIN_PASSWORD` ausschließlich als serverseitiges Secret konfigurieren. Lokale Wrangler-Entwicklung: ignorierte `.dev.vars` verwenden. GitHub Pages allein führt dieses Backend nicht aus.

## Verhalten

- Öffentliche Daten und Chats werden alle drei Sekunden geladen. Bei Ausfällen wird keine aktive Live-Verbindung behauptet.
- Besuchertests laufen lokal und werden nie gespeichert; Admin-Tests werden serverseitig berechnet und öffentlich gespeichert.
- Exakte Probedivision, n=1…1.000.000, höchstens 10.000 Indizes pro Lauf. Die ersten 100 Zeilen werden angezeigt.
- Admins können Updates, Werte, öffentliche Formeln und private Notizen erstellen, ändern oder löschen. Offizielle Berechnungen können gelöscht und neu berechnet werden; Resultate sind keine frei editierbaren Behauptungen.
- Session-Token als HttpOnly/Secure/SameSite-Cookie, acht Stunden Laufzeit; Token-Hashes in D1. Server prüft jede geschützte Aktion. Login auf fünf Versuche pro IP und 15 Minuten begrenzt, Chat auf 20 Nachrichten/Minute. Gemeinsames Passwort ergibt gemeinsame Admin-Rechte, keine individuellen Konten.
- Freie Chat-Namen sind nicht verifiziert. Admins können Nachrichten entfernen. Es werden höchstens 100 Nachrichten je Chat und die neuesten 250 Forschungseinträge pro Abruf angezeigt.
- Die bekannte notwendige Bedingung 6n ± 1 ist keine hinreichende Primzahlformel. q-Teilbarkeit ist nur bei Kandidat > q eine Scheiterstelle.

## GitHub

Dieses Verzeichnis kann als öffentliches Repository veröffentlicht werden. Keine Secrets, private Forschungsnotizen oder Chat-Daten in Git einchecken. Laufzeitdaten liegen ausschließlich in der Datenbank. Hostingkonfiguration enthält keine Zugangsdaten.
