"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Plus, X } from "lucide-react";

import { linkCharacter } from "@/lib/helixApi";
import { useCortexSession } from "@/components/providers/CortexSessionProvider";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

function portraitUrl(eveCharacterId: number, size = 64): string {
  return `https://images.evetech.net/characters/${eveCharacterId}/portrait?size=${size}`;
}

export function CharacterSwitcher() {
  const { session, switchActiveCharacter, unlinkCharacter } =
    useCortexSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!session) return null;

  const active = session.characters.find(
    (c) => c.id === session.activeCharacterId,
  );

  return (
    <div className="character-switcher" ref={rootRef}>
      <button
        type="button"
        className="character-switcher__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {active ? (
          <Image
            className="character-switcher__portrait"
            src={portraitUrl(active.eveCharacterId, 32)}
            alt=""
            width={24}
            height={24}
          />
        ) : null}
        <span className="session">
          <span className="session__label">
            {active ? active.eveCharacterName : "Select character"}
          </span>
          <StatusIndicator variant="online">Online</StatusIndicator>
        </span>
        <ChevronDown size={14} />
      </button>

      {open ? (
        <div className="character-switcher__menu" role="menu">
          {session.characters.map((character) => (
            <div
              key={character.id}
              className={`character-switcher__item ${character.id === session.activeCharacterId ? "active" : ""}`}
            >
              <button
                type="button"
                className="character-switcher__item-main"
                role="menuitem"
                disabled={character.id === session.activeCharacterId}
                onClick={() => {
                  switchActiveCharacter(character.id);
                  setOpen(false);
                }}
              >
                <Image
                  className="character-switcher__portrait"
                  src={portraitUrl(character.eveCharacterId, 32)}
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="character-switcher__item-name">
                  {character.eveCharacterName}
                </span>
                {character.needsRelink ? (
                  <span className="nav-item__badge">Relink</span>
                ) : null}
              </button>
              <button
                type="button"
                className="character-switcher__unlink"
                aria-label={`Unlink ${character.eveCharacterName}`}
                onClick={() => unlinkCharacter(character.id)}
              >
                <X size={12} />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="character-switcher__add"
            onClick={linkCharacter}
          >
            <Plus size={14} />
            <span>Add character</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
