#!/usr/bin/env python3
"""
Esporta tutti i file HTML, CSS e JS di un progetto web in un unico file TXT.
Utilizzo: python esporta_progetto.py [cartella_progetto] [output.txt]
"""

import os
import sys
from pathlib import Path
from datetime import datetime

# Estensioni da includere
ESTENSIONI = {".html", ".css", ".js"}

SEPARATORE = "=" * 80


def esporta_progetto(cartella: str, output: str):
    cartella_path = Path(cartella).resolve()

    if not cartella_path.exists():
        print(f"❌ Cartella non trovata: {cartella_path}")
        sys.exit(1)

    # Raccoglie tutti i file con le estensioni target
    file_trovati = []
    for estensione in ESTENSIONI:
        file_trovati.extend(cartella_path.rglob(f"*{estensione}"))

    # Ordina: prima HTML, poi CSS, poi JS
    ordine = {".html": 0, ".css": 1, ".js": 2}
    file_trovati.sort(key=lambda f: (ordine.get(f.suffix.lower(), 99), str(f)))

    if not file_trovati:
        print("⚠️  Nessun file HTML, CSS o JS trovato nella cartella.")
        sys.exit(0)

    output_path = Path(output)

    with open(output_path, "w", encoding="utf-8") as out:
        # Intestazione
        out.write(f"PROGETTO: {cartella_path.name}\n")
        out.write(f"Esportato il: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n")
        out.write(f"Totale file: {len(file_trovati)}\n")
        out.write(SEPARATORE + "\n")
        out.write("INDICE DEI FILE:\n")
        for i, f in enumerate(file_trovati, 1):
            percorso_relativo = f.relative_to(cartella_path)
            out.write(f"  {i:02d}. {percorso_relativo}\n")
        out.write(SEPARATORE + "\n\n")

        # Contenuto di ogni file
        for f in file_trovati:
            percorso_relativo = f.relative_to(cartella_path)
            out.write(f"\n{SEPARATORE}\n")
            out.write(f"FILE: {percorso_relativo}\n")
            out.write(f"TIPO: {f.suffix.upper().lstrip('.')}\n")
            out.write(SEPARATORE + "\n\n")

            try:
                contenuto = f.read_text(encoding="utf-8")
                out.write(contenuto)
            except UnicodeDecodeError:
                contenuto = f.read_text(encoding="latin-1")
                out.write(contenuto)

            out.write("\n")

        # Piè di pagina
        out.write(f"\n{SEPARATORE}\n")
        out.write("FINE ESPORTAZIONE\n")
        out.write(SEPARATORE + "\n")

    print(f"✅ Esportazione completata!")
    print(f"   File trovati : {len(file_trovati)}")
    print(f"   Output       : {output_path.resolve()}")
    print(f"   Dimensione   : {output_path.stat().st_size / 1024:.1f} KB")


def main():
    # Argomenti da riga di comando
    cartella = sys.argv[1] if len(sys.argv) > 1 else "."
    output = sys.argv[2] if len(sys.argv) > 2 else "progetto_esportato.txt"

    print(f"📁 Cartella sorgente : {Path(cartella).resolve()}")
    print(f"📄 File di output    : {output}")
    print()

    esporta_progetto(cartella, output)


if __name__ == "__main__":
    main()
