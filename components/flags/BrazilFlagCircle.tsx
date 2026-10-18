import React from 'react';

export function BrazilFlagCircle({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg
      viewBox="-1800 -1800 3600 3600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Brazilian Flag"
    >
      <defs>
        <clipPath id="circle_clip_brazil">
          <circle cx="0" cy="0" r="1800" />
        </clipPath>

        <clipPath id="br_B">
          <circle r="735" />
        </clipPath>

        <clipPath id="br_g">
          <path d="m-31.5 0v-70h63v70zm31.5-47v12h31.5v-12z" />
        </clipPath>

        <g id="br_G">
          <use clipPath="url(#br_g)" href="#br_O" />
          <path d="M5-35H31.5V-25H5z" />
          <path d="m21.5-35h10v35h-10z" />
        </g>

        <g id="br_R">
          <use href="#br_P" />
          <path d="m28 0c0-10 0-32-15-32h-19c22 0 22 22 22 32" />
        </g>

        <g id="br_s" fill="#ffffff">
          <g id="br_c">
            <path id="br_t" transform="rotate(18,0,-1)" d="m0-1v1h0.5" />
            <use transform="scale(-1,1)" href="#br_t" />
          </g>
          <use transform="rotate(72)" href="#br_c" />
          <use transform="rotate(-72)" href="#br_c" />
          <use transform="rotate(144)" href="#br_c" />
          <use transform="rotate(216)" href="#br_c" />
        </g>

        <g id="br_a"><use transform="scale(31.5)" href="#br_s" /></g>
        <g id="br_b"><use transform="scale(26.25)" href="#br_s" /></g>
        <g id="br_f"><use transform="scale(21)" href="#br_s" /></g>
        <g id="br_h"><use transform="scale(15)" href="#br_s" /></g>
        <g id="br_i"><use transform="scale(10.5)" href="#br_s" /></g>

        <path
          id="br_D"
          d="m-31.5 0h33a30 30 0 0 0 30-30v-10a30 30 0 0 0-30-30h-33zm13-13h19a19 19 0 0 0 19-19v-6a19 19 0 0 0-19-19h-19z"
          fillRule="evenodd"
        />
        <path
          id="br_E"
          transform="translate(-31.5)"
          d="m0 0h63v-13h-51v-18h40v-12h-40v-14h48v-13h-60z"
        />
        <path
          id="br_e"
          d="m-26.25 0h52.5v-12h-40.5v-16h33v-12h-33v-11h39.25v-12h-51.25z"
        />
        <path
          id="br_M"
          d="m-31.5 0h12v-48l14 48h11l14-48v48h12v-70h-17.5l-14 48-14-48h-17.5z"
        />
        <path
          id="br_O"
          d="m0 0a31.5 35 0 0 0 0-70 31.5 35 0 0 0 0 70m0-13a18.5 22 0 0 0 0-44 18.5 22 0 0 0 0 44"
          fillRule="evenodd"
        />
        <path
          id="br_P"
          d="m-31.5 0h13v-26h28a22 22 0 0 0 0-44h-40zm13-39h27a9 9 0 0 0 0-18h-27z"
          fillRule="evenodd"
        />
        <path
          id="br_S"
          d="m-15.75-22c0 7 6.75 10.5 16.75 10.5s14.74-3.25 14.75-7.75c0-14.25-46.75-5.25-46.5-30.25 0.25-21.5 24.75-20.5 33.75-20.5s26 4 25.75 21.25h-15.25c0-7.5-7-10.25-15-10.25-7.75 0-13.25 1.25-13.25 8.5-0.25 11.75 46.25 4 46.25 28.75 0 18.25-18 21.75-31.5 21.75-11.5 0-31.55-4.5-31.5-22z"
        />
      </defs>

      <g clipPath="url(#circle_clip_brazil)">
        {/* Green circle base */}
        <circle cx="0" cy="0" r="1800" fill="#009440" />

        {/* Yellow rhombus */}
        <path d="M -1743,0 0,1113 1743,0 0,-1113 Z" fill="#ffcb00" />

        {/* Blue celestial sphere */}
        <circle r="735" fill="#302681" />

        {/* White curved banner */}
        <path
          d="m-2205 1470a1785 1785 0 0 1 3570 0h-105a1680 1680 0 1 0-3360 0z"
          clipPath="url(#br_B)"
          fill="#ffffff"
        />

        {/* Motto: ORDEM E PROGRESSO */}
        <g transform="translate(-420,1470)" fill="#009440">
          <use transform="rotate(-7)" y="-1697.5" href="#br_O" />
          <use transform="rotate(-4)" y="-1697.5" href="#br_R" />
          <use transform="rotate(-1)" y="-1697.5" href="#br_D" />
          <use transform="rotate(2)" y="-1697.5" href="#br_E" />
          <use transform="rotate(5)" y="-1697.5" href="#br_M" />
          <use transform="rotate(9.75)" y="-1697.5" href="#br_e" />
          <use transform="rotate(14.5)" y="-1697.5" href="#br_P" />
          <use transform="rotate(17.5)" y="-1697.5" href="#br_R" />
          <use transform="rotate(20.5)" y="-1697.5" href="#br_O" />
          <use transform="rotate(23.5)" y="-1697.5" href="#br_G" />
          <use transform="rotate(26.5)" y="-1697.5" href="#br_R" />
          <use transform="rotate(29.5)" y="-1697.5" href="#br_E" />
          <use transform="rotate(32.5)" y="-1697.5" href="#br_S" />
          <use transform="rotate(35.5)" y="-1697.5" href="#br_S" />
          <use transform="rotate(38.5)" y="-1697.5" href="#br_O" />
        </g>

        {/* Stars */}
        <use x="-600" y="-132" href="#br_a" />
        <use x="-535" y="177" href="#br_a" />
        <use x="-625" y="243" href="#br_b" />
        <use x="-463" y="132" href="#br_h" />
        <use x="-382" y="250" href="#br_b" />
        <use x="-404" y="323" href="#br_f" />
        <use x="228" y="-228" href="#br_a" />
        <use x="515" y="258" href="#br_a" />
        <use x="617" y="265" href="#br_f" />
        <use x="545" y="323" href="#br_b" />
        <use x="368" y="477" href="#br_b" />
        <use x="367" y="551" href="#br_f" />
        <use x="441" y="419" href="#br_f" />
        <use x="500" y="382" href="#br_b" />
        <use x="365" y="405" href="#br_f" />
        <use x="-280" y="30" href="#br_b" />
        <use x="200" y="-37" href="#br_f" />
        <use y="330" href="#br_a" />
        <use x="85" y="184" href="#br_b" />
        <use y="118" href="#br_b" />
        <use x="-74" y="184" href="#br_f" />
        <use x="-37" y="235" href="#br_h" />
        <use x="220" y="495" href="#br_b" />
        <use x="283" y="430" href="#br_f" />
        <use x="162" y="412" href="#br_f" />
        <use x="-295" y="390" href="#br_a" />
        <use y="575" href="#br_i" />
      </g>
    </svg>
  );
}
