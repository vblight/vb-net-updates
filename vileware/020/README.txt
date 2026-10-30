015 — OFFLINE SELECTOR FIX

No runtime.html injection.
Fresh mirror.
Shinier/Shiniest racers use assets/racers/<known filename>.
Rag-Tag Bastards use assets/<exact filename>, matching the repo.

Because the installed 0.2.60 package predates those ten files, 015 searches common local checkout locations
(Desktop/Documents/Downloads/source/repos and the 015 working directory) for a vile-vb-net-style
games/vile-kart/assets folder and imports ONLY the ten exact Rag-Tag filenames.

It will ABORT rather than fabricate/substitute a missing racer.

TEST:
SYSTEM -> SCAN + LOCATE RAG-TAG FILES.
If it says ALL 10 RAG-TAG FILES LOCATED, AUTHORISE 015, then LAUNCH KART.
If it says source incomplete, send the screen; nothing destructive has happened.

No GitHub writes. Installed app.asar untouched.

015 RETRY PAYLOAD
-----------------
The ten user-supplied Rag-Tag Bastards PNGs are bundled at:
games/vile-kart/assets/

Alias mapping used:
THE_FAT_CONTROLLER_* -> SIR_PORTLY_HATT_*
VICTORIAN_LADY_* -> LADY_PRUDENCE_SIDEWINDER_*

The remaining six retain their supplied filenames.
This structure is deliberately one of 015's searched local source layouts.
