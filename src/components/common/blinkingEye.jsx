import { useEffect, useRef } from "react";

const BlinkingEye = ({ size = 522, className = "" }) => {
  return (
    <svg
      width={size}
      height={(size / 522) * 459}
      viewBox="0 0 522 459"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="eye"
      role="img"
      aria-label="Blinking eye"
    >
      <defs>
        {/* Clip to the exact eye outline so nothing bleeds outside */}
        <clipPath id="eyeShape" clipPathUnits="userSpaceOnUse">
          <path d="M209.921 110.963C234.171 107.397 253.93 112.415 269.551 120.646C285.237 128.91 296.846 140.468 304.558 150.031C308.405 154.802 311.257 159.044 313.137 162.076C313.428 162.545 313.695 162.985 313.939 163.393C248.003 208.068 200.717 203.855 170.049 189.265C154.269 181.757 142.575 171.354 134.814 162.797C130.94 158.525 128.065 154.734 126.17 152.03C125.945 151.708 125.733 151.402 125.536 151.112C158.332 126.016 186.386 114.424 209.921 110.963Z" />
        </clipPath>

        {/* Animated blink rect — scales from top of eye */}
        <clipPath id="blinkClip" clipPathUnits="userSpaceOnUse">
          <rect
            x="110"
            y="107"
            width="220"
            height="100"
            style={{
              transformOrigin: "220px 107px",
              animation: "blinkReveal 3s ease-in-out infinite",
            }}
          />
        </clipPath>

        <style>{`
          @keyframes blinkReveal {
            0%   { transform: scaleY(1); }
            40%  { transform: scaleY(1); }
            45%  { transform: scaleY(0); }
            50%  { transform: scaleY(1); }
            100% { transform: scaleY(1); }
          }
        `}</style>
      </defs>

      {/* Sclera / eye white */}
      <path
        d="M209.921 110.963C234.171 107.397 253.93 112.415 269.551 120.646C285.237 128.91 296.846 140.468 304.558 150.031C308.405 154.802 311.257 159.044 313.137 162.076C313.428 162.545 313.695 162.985 313.939 163.393C248.003 208.068 200.717 203.855 170.049 189.265C154.269 181.757 142.575 171.354 134.814 162.797C130.94 158.525 128.065 154.734 126.17 152.03C125.945 151.708 125.733 151.402 125.536 151.112C158.332 126.016 186.386 114.424 209.921 110.963Z"
        fill="#FFF4E2"
        stroke="#1C1C35"
        strokeWidth="9.055"
      />

      {/* Iris + pupil — double-clipped: eye outline + blink rect */}
      <g clipPath="url(#eyeShape)">
        <g clipPath="url(#blinkClip)">
          {/* White ring */}
          <path
            d="M254.2 146.854C251.188 127.757 232.363 114.584 213.266 117.596C194.169 120.608 180.996 139.433 184.008 158.53C187.02 177.627 205.845 190.799 224.942 187.788C244.039 184.776 257.212 165.951 254.2 146.854Z"
            fill="white"
            stroke="#1C1C35"
            strokeWidth="11.7778"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Blue iris */}
          <path
            d="M245.262 149.025C243.006 134.726 228.911 124.862 214.612 127.117C200.312 129.372 190.448 143.468 192.704 157.767C194.959 172.067 209.054 181.93 223.354 179.675C237.653 177.42 247.517 163.324 245.262 149.025Z"
            fill="#0072A3"
            stroke="#1C1C35"
            strokeWidth="11.7778"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Eyelashes */}
      <path
        d="M266.415 84.5557L245.264 114.511"
        stroke="#1C1C35"
        strokeWidth="7.28857"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M219.368 113.195L226.993 77.7403"
        stroke="#1C1C35"
        strokeWidth="7.28857"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M191.413 77.5813L195.221 112.35"
        stroke="#1C1C35"
        strokeWidth="7.28857"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M160.165 90.188L183.171 114.392"
        stroke="#1C1C35"
        strokeWidth="7.28857"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BlinkingEye;