import localFont from "next/font/local";

export const departureMono = localFont({
  src: [
    {
      path: "./DepartureMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-departure-mono",
  display: "swap",
});

export const fragmentMono = localFont({
  src: [
    {
      path: "./FragmentMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fragment-mono",
  display: "swap",
});

export const sfProDisplay = localFont({
  src: [
    {
      path: "./SFPRODISPLAYREGULAR.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SFPRODISPLAYMEDIUM.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./SFPRODISPLAYBOLD.woff2",
      weight: "700",
      style: "normal",
    },

    //italics
    {
      path: "./SFPRODISPLAYULTRALIGHTITALIC.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "./SFPRODISPLAYLIGHTITALIC.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "./SFPRODISPLAYTHINITALIC.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./SFPRODISPLAYSEMIBOLDITALIC.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./SFPRODISPLAYBLACKITALIC.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "./SFPRODISPLAYHEAVYITALIC.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-display",
  display: "swap",
});
