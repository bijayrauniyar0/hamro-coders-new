import React from 'react';

const AnimatingSVg = () => {
  return (
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7722CC" />
          <stop offset="100%" stopColor="#B066F2" />
        </linearGradient>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B066F2" />
          <stop offset="100%" stopColor="#7722CC" />
        </linearGradient>
        <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="100%" stopColor="#FFBB00" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* <rect x="0" y="0" width="800" height="400" fill="#f8f9fa" /> */}

      <rect x="250" y="50" width="300" height="260" rx="20" fill="#9C27B0" />
      <rect x="260" y="60" width="280" height="230" rx="15" fill="white" />

      <g id="mcqGroup">
        <rect x="280" y="80" width="240" height="30" rx="5" fill="#f0f0f0">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
        <text x="290" y="100" fontFamily="Arial" fontSize="11" fill="#333">
          What is the capital of Nepal?
        </text>

        <g>
          <rect
            id="option1"
            x="280"
            y="120"
            width="240"
            height="25"
            rx="5"
            fill="#f0f0f0"
          >
            <animate
              id="correct"
              attributeName="fill"
              values="#f0f0f0;#f0f0f0;#f0f0f0;#f0f0f0;#a3ffb8;#a3ffb8;#a3ffb8;#f0f0f0"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
          </rect>
          <text x="310" y="137" fontFamily="Arial" fontSize="11" fill="#333">
            Kathmandu
          </text>

          <rect
            id="option2"
            x="280"
            y="155"
            width="240"
            height="25"
            rx="5"
            fill="#f0f0f0"
          >
            <animate
              id="wrong"
              attributeName="fill"
              values="#f0f0f0;#f0f0f0;#ffb3b3;#ffb3b3;#ffb3b3;#f0f0f0;#f0f0f0;#f0f0f0"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
          </rect>
          <text x="310" y="172" fontFamily="Arial" fontSize="11" fill="#333">
            Pokhara
          </text>

          <rect
            id="option3"
            x="280"
            y="190"
            width="240"
            height="25"
            rx="5"
            fill="#f0f0f0"
          />
          <text x="310" y="207" fontFamily="Arial" fontSize="11" fill="#333">
            Lalitpur
          </text>

          <rect
            id="option4"
            x="280"
            y="225"
            width="240"
            height="25"
            rx="5"
            fill="#f0f0f0"
          />
          <text x="310" y="242" fontFamily="Arial" fontSize="11" fill="#333">
            Bhaktapur
          </text>

          <circle
            cx="295"
            cy="132.5"
            r="7"
            fill="white"
            stroke="#ccc"
            strokeWidth="2"
          />
          <circle
            cx="295"
            cy="167.5"
            r="7"
            fill="white"
            stroke="#ccc"
            strokeWidth="2"
          />
          <circle
            cx="295"
            cy="202.5"
            r="7"
            fill="white"
            stroke="#ccc"
            strokeWidth="2"
          />
          <circle
            cx="295"
            cy="237.5"
            r="7"
            fill="white"
            stroke="#ccc"
            strokeWidth="2"
          />

          <circle cx="295" cy="132.5" r="0" fill="url(#purpleGradient)">
            <animate
              attributeName="r"
              values="0;0;0;4;4;4;4;0"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
          </circle>

          <circle cx="295" cy="167.5" r="0" fill="url(#purpleGradient)">
            <animate
              attributeName="r"
              values="0;4;4;0;0;0;0;0"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
          </circle>

          <g opacity="0">
            <path
              d="M330,132.5 L335,137.5 L345,127.5"
              stroke="#00aa44"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate
                attributeName="opacity"
                values="0;0;0;0;1;1;1;0"
                dur="6s"
                repeatCount="indefinite"
                begin="2s"
              />
            </path>
          </g>

          <g opacity="0">
            <path
              d="M330,162.5 L340,172.5 M340,162.5 L330,172.5"
              stroke="#dd0000"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="opacity"
                values="0;0;1;1;1;0;0;0"
                dur="6s"
                repeatCount="indefinite"
                begin="2s"
              />
            </path>
          </g>

          <rect x="440" y="260" width="80" height="25" rx="5" fill="#7722CC">
            <animate
              attributeName="fill"
              values="#7722CC;#a020f0;#7722CC"
              dur="6s"
              repeatCount="indefinite"
              begin="2s"
            />
          </rect>
          <text x="460" y="277" fontFamily="Arial" fontSize="12" fill="white">
            Submit
          </text>

          <g opacity="0">
            <rect x="280" y="260" width="80" height="25" rx="5" fill="#a3ffb8">
              <animate
                attributeName="opacity"
                values="0;0;0;0;1;1;1;0"
                dur="6s"
                repeatCount="indefinite"
                begin="2s"
              />
            </rect>
            <text
              x="293"
              y="277"
              fontFamily="Arial"
              fontSize="11"
              fill="#006600"
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;0;0;1;1;1;0"
                dur="6s"
                repeatCount="indefinite"
                begin="2s"
              />
              Correct!
            </text>
          </g>
        </g>
      </g>
      {/* text book */}
      <g transform="translate(150, 150)">
        <rect
          x="-30"
          y="-40"
          width="60"
          height="80"
          rx="3"
          fill="url(#pinkGradient)"
        />
        <line
          x1="-20"
          y1="-25"
          x2="20"
          y2="-25"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1="-20"
          y1="-10"
          x2="10"
          y2="-10"
          stroke="white"
          strokeWidth="2"
        />
        <line x1="-20" y1="5" x2="15" y2="5" stroke="white" strokeWidth="2" />
        <line x1="-20" y1="20" x2="0" y2="20" stroke="white" strokeWidth="2" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="150,150; 150,140; 150,150"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      {/* space ball */}
      <g transform="translate(600, 180)">
        <circle cx="0" cy="0" r="40" fill="url(#yellowGradient)" />
        <ellipse
          cx="0"
          cy="0"
          rx="40"
          ry="15"
          fill="none"
          stroke="#FFE066"
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;360"
            dur="10s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="0"
          cy="0"
          rx="30"
          ry="30"
          fill="none"
          stroke="#FFE066"
          strokeWidth="2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="45;405"
            dur="15s"
            repeatCount="indefinite"
          />
        </ellipse>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="600,180; 610,170; 600,180"
          dur="5s"
          repeatCount="indefinite"
        />
      </g>
      {/* clock */}
      <g transform="translate(110, 100)">
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="white"
          stroke="url(#purpleGradient)"
          strokeWidth="5"
        />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-20"
          stroke="url(#purpleGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;360"
            dur="60s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="0"
          y1="0"
          x2="15"
          y2="0"
          stroke="url(#purpleGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;360"
            dur="10s"
            repeatCount="indefinite"
          />
        </line>
        <circle cx="0" cy="0" r="4" fill="url(#purpleGradient)" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="110,100; 115,105; 110,100"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
      {/* box */}
      <g transform="translate(670, 80)">
        {/* <!-- PC Monitor --> */}
        <rect
          x="-30"
          y="-30"
          width="60"
          height="50"
          rx="6"
          fill="url(#pinkGradient)"
        />
        {/* <!-- Screen --> */}
        <rect x="-25" y="-25" width="50" height="40" rx="3" fill="white" />

        {/* <!-- Equalizer bars --> */}
        <g transform="translate(0, 18) scale(1, -1)">
          <rect x="-20" y="0" width="6" height="10" fill="#7722CC">
            <animate
              attributeName="height"
              values="10;30;10"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="translate(12, 18) scale(1, -1)">
          <rect x="-20" y="0" width="6" height="10" fill="#7722CC">
            <animate
              attributeName="height"
              values="10;20;10"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="translate(24, 18) scale(1, -1)">
          <rect x="-20" y="0" width="6" height="10" fill="#7722CC">
            <animate
              attributeName="height"
              values="10;25;10"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="translate(35, 18) scale(1, -1)">
          <rect x="-20" y="0" width="6" height="10" fill="#7722CC">
            <animate
              attributeName="height"
              values="10;35;10"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g transform="translate(0, 18) scale(1, -1)">
          <rect x="-20" y="0" width="6" height="10" fill="#7722CC">
            <animate
              attributeName="height"
              values="10;30;10"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* <!-- PC Stand --> */}
        <rect x="-10" y="20" width="20" height="6" rx="2" fill="#444" />
        <rect x="-20" y="26" width="40" height="6" rx="3" fill="#555" />

        {/* <!-- Floating animation --> */}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="670,80; 660,85; 670,80"
          dur="7s"
          repeatCount="indefinite"
        />
      </g>

      {/* trophy */}
      <g transform="translate(520, 80)">
        <path
          d="M-15,15 L15,15 L15,-5 C15,-15 25,-15 25,-25 C25,-35 15,-35 5,-35 L-5,-35 C-15,-35 -25,-35 -25,-25 C-25,-15 -15,-15 -15,-5 Z"
          fill="url(#yellowGradient)"
        />
        <rect
          x="-5"
          y="15"
          width="10"
          height="10"
          fill="url(#yellowGradient)"
        />
        <rect
          x="-15"
          y="25"
          width="30"
          height="5"
          rx="2"
          fill="url(#yellowGradient)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="520,80; 520,70; 520,80"
          dur="3s"
          repeatCount="indefinite"
        />
      </g>
      {/* leaderboard */}
      <g transform="translate(175, 300)">
        <rect
          x="-30"
          y="-10"
          width="20"
          height="30"
          fill="url(#purpleGradient)"
        />
        <rect x="-5" y="-20" width="20" height="40" fill="url(#pinkGradient)" />
        <rect x="20" y="0" width="20" height="20" fill="url(#yellowGradient)" />
        <text x="-20" y="8" fontFamily="Arial" fontSize="12" fill="white">
          2
        </text>
        <text x="5" y="-2" fontFamily="Arial" fontSize="12" fill="white">
          1
        </text>
        <text x="30" y="15" fontFamily="Arial" fontSize="12" fill="white">
          3
        </text>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="175,300; 175,290; 175,300"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      {/* a */}
      <g transform="translate(280, 210)">
        <circle cx="0" cy="0" r="20" fill="url(#pinkGradient)" />
        <text
          x="-7"
          y="5"
          fontFamily="Arial"
          fontSize="20"
          fontWeight="bold"
          fill="white"
        >
          A
        </text>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="280,210; 310,195; 290,220; 280,210"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
      {/* b */}
      <g transform="translate(420, 270)">
        <circle cx="0" cy="0" r="20" fill="url(#pinkGradient)" />
        <text
          x="-7"
          y="5"
          fontFamily="Arial"
          fontSize="20"
          fontWeight="bold"
          fill="white"
        >
          B
        </text>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="420,270; 430,250; 410,280; 420,270"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </g>
      {/* c */}
      <g transform="translate(310, 380)">
        <circle cx="0" cy="0" r="20" fill="url(#pinkGradient)" />
        <text
          x="-7"
          y="5"
          fontFamily="Arial"
          fontSize="20"
          fontWeight="bold"
          fill="white"
        >
          C
        </text>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="310,330; 330,360; 320,340; 310,330"
          dur="5.5s"
          repeatCount="indefinite"
        />
      </g>
      {/* D */}
      <g transform="translate(390, 330)">
        <circle cx="0" cy="0" r="20" fill="url(#pinkGradient)" />
        <text
          x="-7"
          y="5"
          fontFamily="Arial"
          fontSize="20"
          fontWeight="bold"
          fill="white"
        >
          D
        </text>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="390,330; 370,310; 400,340; 390,330"
          dur="7s"
          repeatCount="indefinite"
        />
      </g>

      {/* bottom medal */}
      <g transform="translate(500, 320)">
        <path
          d="M-25,-30 L25,-30 L25,10 L0,30 L-25,10 Z"
          fill="url(#yellowGradient)"
        />
        <circle cx="0" cy="-10" r="15" fill="white" />
        <path
          d="M-5,-15 L-10,-5 L0,0 L10,-5 L5,-15"
          fill="url(#purpleGradient)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="500,320; 500,310; 500,320"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
      {/* clock */}
      <g transform="translate(625, 300)">
        <circle cx="0" cy="0" r="25" fill="url(#purpleGradient)" />
        <circle cx="0" cy="0" r="20" fill="white" />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-12"
          stroke="#9C27B0"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;360"
            dur="12s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="0"
          y1="0"
          x2="8"
          y2="0"
          stroke="#9C27B0"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;360"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
        <circle cx="0" cy="0" r="3" fill="#9C27B0" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="625,300; 625,290; 625,300"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
};

export default AnimatingSVg;
