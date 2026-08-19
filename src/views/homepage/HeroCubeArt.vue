<template>
  <div class="relative z-10 w-full max-w-[640px] lg:flex-1" aria-hidden="true">
    <svg class="hero-cube-svg h-auto w-full" viewBox="0 0 460 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heroCubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3C64F4" />
          <stop offset="55%" stop-color="#8A3FE0" />
          <stop offset="100%" stop-color="#E31C79" />
        </linearGradient>
      </defs>

      <g class="iso-cube-group cube-back">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -9; 0 0" dur="5.5s" repeatCount="indefinite" />
        <polygon points="270,10 350,54 270,98 190,54" fill="rgba(60,100,244,0.08)" />
        <polygon points="190,54 270,98 270,186 190,142" fill="rgba(106,79,232,0.12)" />
        <polygon points="270,98 350,54 350,142 270,186" fill="rgba(138,63,224,0.20)" />
        <polygon points="270,10 350,54 270,98 190,54" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.6" stroke-linejoin="round" />
        <polygon points="190,54 270,98 270,186 190,142" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.6" stroke-linejoin="round" />
        <polygon points="270,98 350,54 350,142 270,186" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.6" stroke-linejoin="round" />
      </g>

      <g class="iso-cube-group cube-right-small">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 6 -3; 0 0" dur="4.5s" repeatCount="indefinite" />
        <polygon points="370,100 410,122 370,144 330,122" fill="rgba(106,79,232,0.10)" />
        <polygon points="330,122 370,144 370,196 330,174" fill="rgba(138,63,224,0.16)" />
        <polygon points="370,144 410,122 410,174 370,196" fill="rgba(227,28,121,0.22)" />
        <polygon points="370,100 410,122 370,144 330,122" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.4" stroke-linejoin="round" />
        <polygon points="330,122 370,144 370,196 330,174" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.4" stroke-linejoin="round" />
        <polygon points="370,144 410,122 410,174 370,196" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.4" stroke-linejoin="round" />
      </g>

      <g class="iso-cube-group cube-front">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; -4 -6; 0 0" dur="6.5s" repeatCount="indefinite" />
        <polygon points="150,194 230,238 150,282 70,238" fill="rgba(60,100,244,0.10)" />
        <polygon points="70,238 150,282 150,372 70,328" fill="rgba(106,79,232,0.18)" />
        <polygon points="150,282 230,238 230,328 150,372" fill="rgba(227,28,121,0.28)" />
        <polygon points="150,194 230,238 150,282 70,238" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.6" stroke-linejoin="round" />
        <polygon points="70,238 150,282 150,372 70,328" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.6" stroke-linejoin="round" />
        <polygon points="150,282 230,238 230,328 150,372" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.6" stroke-linejoin="round" />
      </g>

      <g class="iso-cube-group cube-front-small">
        <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 4 -5; 0 0" dur="5s" repeatCount="indefinite" />
        <polygon points="282,316 318,336 282,356 246,336" fill="rgba(60,100,244,0.10)" />
        <polygon points="246,336 282,356 282,392 246,372" fill="rgba(106,79,232,0.16)" />
        <polygon points="282,356 318,336 318,372 282,392" fill="rgba(227,28,121,0.24)" />
        <polygon points="282,316 318,336 282,356 246,336" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.4" stroke-linejoin="round" />
        <polygon points="246,336 282,356 282,392 246,372" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.4" stroke-linejoin="round" />
        <polygon points="282,356 318,336 318,372 282,392" fill="none" stroke="url(#heroCubeGradient)" stroke-width="1.4" stroke-linejoin="round" />
      </g>

      <g class="cube-nodes">
        <circle cx="16" cy="190" r="5" fill="#3C64F4"><animate attributeName="opacity" values="1;.4;1" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="112" cy="60" r="3.2" fill="#6A4FE8"><animate attributeName="opacity" values="1;.4;1" dur="3s" begin=".8s" repeatCount="indefinite" /></circle>
        <circle cx="192" cy="102" r="3.2" fill="#8A3FE0"><animate attributeName="opacity" values="1;.4;1" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="340" cy="186" r="3.2" fill="#B12FA8"><animate attributeName="opacity" values="1;.4;1" dur="3s" begin=".8s" repeatCount="indefinite" /></circle>
        <circle cx="402" cy="212" r="3.4" fill="#E31C79"><animate attributeName="opacity" values="1;.4;1" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="62" cy="382" r="3.2" fill="#3C64F4"><animate attributeName="opacity" values="1;.4;1" dur="3s" begin=".8s" repeatCount="indefinite" /></circle>
        <circle cx="148" cy="306" r="3.6" fill="#E31C79"><animate attributeName="opacity" values="1;.4;1" dur="3s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  </div>
</template>

