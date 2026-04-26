<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  level:     number
}>()
</script>

<template>
  <aside class="char-panel">

    <span class="char-panel__corner char-panel__corner--tl" aria-hidden="true" />
    <span class="char-panel__corner char-panel__corner--tr" aria-hidden="true" />
    <span class="char-panel__corner char-panel__corner--bl" aria-hidden="true" />
    <span class="char-panel__corner char-panel__corner--br" aria-hidden="true" />

    <div class="char-panel__scanline" aria-hidden="true" />

    <div class="char-panel__frame">

      <img
        v-if="props.avatarUrl"
        :src="props.avatarUrl"
        alt="Personnage"
        class="char-panel__img"
      />

      <svg v-else viewBox="0 0 240 330" xmlns="http://www.w3.org/2000/svg" class="char-panel__svg">
        <defs>
          <radialGradient id="head-glow-grad" cx="40%" cy="35%">
            <stop offset="0%"   stop-color="#60a5fa"/>
            <stop offset="60%"  stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </radialGradient>
        </defs>

        <ellipse cx="120" cy="320" rx="48" ry="6" fill="#7c3aed" opacity="0.18"/>
        <ellipse cx="120" cy="310" rx="54" ry="9" fill="#1e1640" stroke="#4c3d8f" stroke-width="1.5"/>
        <rect x="74" y="308" width="92" height="6" rx="2" fill="#16112e"/>
        <rect x="82"  y="311" width="24" height="2" rx="1" fill="#7c3aed" opacity="0.7"/>
        <rect x="134" y="311" width="24" height="2" rx="1" fill="#7c3aed" opacity="0.7"/>

        <g class="avatar-float">

          <path d="M82 148 Q55 190 60 238 Q62 256 71 258 Q79 261 83 252 Q76 220 90 178 Z" fill="#2d0a5e" class="avatar-cape-left"/>
          <path d="M82 148 Q55 190 60 238 Q62 256 71 258 Q79 261 83 252 Q76 220 90 178 Z" fill="#7c3aed" opacity="0.15" class="avatar-cape-left"/>
          <path d="M158 148 Q185 190 180 238 Q178 256 169 258 Q161 261 157 252 Q164 220 150 178 Z" fill="#2d0a5e" class="avatar-cape-right"/>
          <path d="M158 148 Q185 190 180 238 Q178 256 169 258 Q161 261 157 252 Q164 220 150 178 Z" fill="#7c3aed" opacity="0.15" class="avatar-cape-right"/>

          <rect x="85" y="148" width="70" height="72" rx="9" fill="#120a24"/>
          <rect x="85" y="148" width="70" height="72" rx="9" fill="#4c1d95" opacity="0.2"/>
          <text x="120" y="191" text-anchor="middle" fill="#8b5cf6" font-size="20" font-family="monospace" font-weight="bold">&lt;/&gt;</text>
          <rect x="85" y="162" width="70" height="2" rx="1" fill="#6d28d9" opacity="0.4"/>

          <rect x="83" y="212" width="74" height="10" rx="3" fill="#78350f"/>
          <rect x="83" y="212" width="74" height="10" rx="3" fill="#d97706" opacity="0.3"/>
          <rect x="112" y="213" width="16" height="8" rx="2" fill="#6b2d0a"/>
          <rect x="114" y="214" width="12" height="6" rx="1" fill="#fbbf24"/>
          <rect x="116" y="216" width="8"  height="2" rx="1" fill="#78350f"/>

          <rect x="66" y="150" width="20" height="44" rx="9" fill="#120a24"/>
          <rect x="63" y="183" width="26" height="12" rx="5" fill="#4c1d95"/>
          <rect x="63" y="183" width="26" height="4"  rx="2" fill="#7c3aed" opacity="0.5"/>
          <g class="hand-left">
            <ellipse cx="74" cy="204" rx="11" ry="9" fill="#1e1b4b"/>
            <rect x="62" y="196" width="6" height="14" rx="3"   fill="#1e1b4b"/>
            <rect x="69" y="194" width="6" height="16" rx="3"   fill="#1e1b4b"/>
            <rect x="76" y="195" width="5" height="15" rx="2.5" fill="#1e1b4b"/>
            <rect x="82" y="198" width="4" height="11" rx="2"   fill="#1e1b4b"/>
            <rect x="58" y="202" width="5" height="9"  rx="2.5" fill="#1e1b4b" transform="rotate(-20,60,206)"/>
            <circle cx="65" cy="197" r="1.5" fill="#7c3aed" opacity="0.6"/>
            <circle cx="72" cy="195" r="1.5" fill="#7c3aed" opacity="0.6"/>
            <circle cx="79" cy="196" r="1.5" fill="#7c3aed" opacity="0.6"/>
          </g>

          <rect x="154" y="150" width="20" height="44" rx="9" fill="#120a24"/>
          <rect x="151" y="183" width="26" height="12" rx="5" fill="#4c1d95"/>
          <rect x="151" y="183" width="26" height="4"  rx="2" fill="#7c3aed" opacity="0.5"/>
          <g class="hand-right">
            <ellipse cx="166" cy="204" rx="11" ry="9" fill="#1e1b4b"/>
            <rect x="154" y="198" width="4" height="11" rx="2"   fill="#1e1b4b"/>
            <rect x="159" y="195" width="5" height="15" rx="2.5" fill="#1e1b4b"/>
            <rect x="165" y="194" width="6" height="16" rx="3"   fill="#1e1b4b"/>
            <rect x="172" y="196" width="6" height="14" rx="3"   fill="#1e1b4b"/>
            <rect x="175" y="202" width="5" height="9"  rx="2.5" fill="#1e1b4b" transform="rotate(20,177,206)"/>
            <circle cx="162" cy="196" r="1.5" fill="#7c3aed" opacity="0.6"/>
            <circle cx="168" cy="195" r="1.5" fill="#7c3aed" opacity="0.6"/>
            <circle cx="175" cy="197" r="1.5" fill="#7c3aed" opacity="0.6"/>
          </g>

          <rect x="92"  y="220" width="22" height="44" rx="6" fill="#0f0720"/>
          <rect x="126" y="220" width="22" height="44" rx="6" fill="#0f0720"/>
          <line x1="103" y1="220" x2="103" y2="264" stroke="#1e1040" stroke-width="1" opacity="0.5"/>
          <line x1="137" y1="220" x2="137" y2="264" stroke="#1e1040" stroke-width="1" opacity="0.5"/>

          <rect x="87"  y="260" width="32" height="14" rx="6" fill="#0f0720"/>
          <rect x="85"  y="268" width="36" height="8"  rx="5" fill="#e2e8f0"/>
          <rect x="87"  y="260" width="32" height="5"  rx="3" fill="#1a1040"/>
          <text x="100" y="270" text-anchor="middle" fill="#7c3aed" font-size="6" font-family="monospace">&lt;/&gt;</text>
          <rect x="121" y="260" width="32" height="14" rx="6" fill="#0f0720"/>
          <rect x="119" y="268" width="36" height="8"  rx="5" fill="#e2e8f0"/>
          <rect x="121" y="260" width="32" height="5"  rx="3" fill="#1a1040"/>
          <text x="134" y="270" text-anchor="middle" fill="#7c3aed" font-size="6" font-family="monospace">&lt;/&gt;</text>

          <ellipse cx="120" cy="96" rx="43" ry="41" fill="url(#head-glow-grad)"/>
          <ellipse cx="107" cy="78" rx="14" ry="10" fill="white" opacity="0.08"/>
          <g class="avatar-eyes">
            <ellipse cx="107" cy="86" rx="8" ry="8" fill="white"/>
            <ellipse cx="133" cy="86" rx="8" ry="8" fill="white"/>
            <circle cx="107" cy="86" r="5" fill="#1e3a8a"/>
            <circle cx="133" cy="86" r="5" fill="#1e3a8a"/>
            <circle cx="108.5" cy="84.5" r="2" fill="white"/>
            <circle cx="134.5" cy="84.5" r="2" fill="white"/>
          </g>
          <path d="M110 106 Q120 115 130 106" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="98"  cy="100" rx="6" ry="4" fill="#f9a8d4" opacity="0.25"/>
          <ellipse cx="142" cy="100" rx="6" ry="4" fill="#f9a8d4" opacity="0.25"/>

          <path d="M76 76 Q78 61 120 51 Q162 61 164 76 Z" fill="#150d2e"/>
          <rect x="68" y="73" width="104" height="9" rx="2" fill="#0d0820"/>
          <line x1="76" y1="75" x2="164" y2="75" stroke="#fbbf24" stroke-width="2" opacity="0.9"/>
          <rect x="111" y="68" width="18" height="11" rx="3" fill="#6b2d0a"/>
          <rect x="113" y="70" width="14" height="7"  rx="2" fill="#fbbf24"/>
          <rect x="116" y="72" width="8"  height="3"  rx="1" fill="#78350f"/>
          <path d="M110 51 Q115 26 120 12 Q125 26 130 51 Z" fill="#0d0820"/>
          <path d="M113 51 Q117 30 120 18 Q123 30 127 51 Z" fill="#1a0a3e" opacity="0.5"/>
          <text x="120" y="40" text-anchor="middle" fill="#8b5cf6" font-size="11" font-family="monospace" font-weight="bold">&lt;/&gt;</text>
          <circle cx="90"  cy="68" r="1.5" fill="#fbbf24" opacity="0.6"/>
          <circle cx="150" cy="65" r="1"   fill="#a78bfa" opacity="0.7"/>
          <circle cx="145" cy="72" r="1"   fill="#fbbf24" opacity="0.5"/>

        </g>
      </svg>

      <div class="char-panel__glow" aria-hidden="true" />
    </div>

    <div class="char-panel__badge">
      <span class="char-panel__badge-star" aria-hidden="true">&#x2736;</span>
      <span class="char-panel__badge-label">LVL {{ props.level }}</span>
      <span class="char-panel__badge-star" aria-hidden="true">&#x2736;</span>
    </div>

  </aside>
</template>

<style scoped src="@/assets/styles/components/Galaxie_Profil/CharacterPanel.css" />