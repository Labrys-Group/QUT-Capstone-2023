import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "black",
        color: "white",
        fontSize: { base: "10px", md: "13px", lg: "16px" },
      },
      // style for item page content
      ".itemDesc": {
        flexDirection: { base: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
      },
      //style for nav bar
      ".navBarLeft": {
        // alignItems: "stretch",
        marginLeft: { base: "1.5em", md: "3em" },
        paddingTop: "4",
      },
      ".navBarRight": {
        paddingTop: "4",
        marginRight: { base: "1.5em", md: "3em" },
        marginTop: "10px",
      },
      //logo setting
      ".logoImg": {
        width: "100%",
        height: "auto",
        maxWidth: { base: "22em", md: "16em" },
      },
      //set homeBG.png as background image of the app
      ".bgImg": {
        backgroundImage: "url('/homeBg.png')",
        backgroundSize: "cover",
      },
      //set gameBG.png as background image of the app
      ".gameImg": {
        backgroundImage: "url('/game.png')",
        backgroundSize: "cover",
      },

      ".exyGranted": {
        backgroundImage: "url('/exyGranted.gif')",
        backgroundSize: "cover",
      },

      //set exy1.png as background image of a sample item page
      ".exyImg": {
        backgroundImage: "url('/exy1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      ".climbingImg": {
        backgroundImage: "url('/bouldering.jpg')",
        backgroundSize: "cover",
      },
      ".climbingImg2": {
        backgroundImage: "url('/climbing2.jpg')",
        backgroundSize: "cover",
      },
      ".tableTennisImg": {
        backgroundImage: "url('/tableTennis.jpg')",
        backgroundSize: "cover",
      },
      //page padding used in item page
      ".pagePadding": {
        padding: { base: "0", md: "0 4vw" },
      },
      //item page box style
      ".itemBox": {
        paddingTop: { base: "25vh", lg: "20vh" },
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: { base: "10vh" },
      },
      //
      ".contentPagePadding": {
        padding: "0 3.5vw",
      },
      //Big bold title used in homepage
      ".title": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "900",
        fontSize: { base: "5em", md: "6em" },
        lineHeight: "1.2em",
      },
      ".headingSm": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "1.1em",
      },
      ".txtCenter": { textAlign: "center" },

      ".headingMd": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "900",
        fontSize: "1em",
        lineHeight: "17px",
      },
      //Small light blue text used across the app
      ".blueTxt": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        fontSize: "0.9em",
        color: "#7190FF",
      },
      ".blueTxtBold": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "600",
        fontSize: "1em",
        color: "#7190FF",
      },
      //grey paragraph text used across the app
      ".txt": {
        fontFamily: "Inter, sans-serif",
        fontWeight: "400",
        lineHeight: "3em",

        fontSize: { base: "1.2em", md: "1em", lg: "0.9em" },
        color: "rgba(255, 255, 255, 0.7)",
      },
      //This class used for display flex, column, align items center
      ".flexAlgnCenter": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      ".slick-slider": {
        display: "flex",
        alignItems: "center",
      },
      ".slick-next": {
        right: "0px",
      },
      ".slick-prev:before, .slick-next:before": {
        display: "none",
      },
      ".paddingTxt": {
        padding: "0 3em",
      },
      // animation
      "@keyframes rotate_perfume": {
        "0%": { transform: "rotate(-45deg)" },
        "50%": { transform: "rotate(15deg)" },
        "100%": { transform: " rotate(-45deg)" },
      },
      "@keyframes float_pingpang": {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-20px)" },
        "100%": { transform: "translateY(0px)" },
      },
      "@keyframes rotate_climbingshoes": {
        "0%": { transform: "rotate(-45deg)" },
        "50%": { transform: "rotate(15deg)" },
        "100%": { transform: " rotate(-45deg)" },
      },

      "#exy_unlockImage": {
        animation: "none",
      },
      "#climbing_unlockImage": {
        animation: "rotate_climbingshoes 4s ease-in-out infinite",
      },
      "#tableTennis_unlockImage": {
        animation: "float_pingpang 2s ease-in-out infinite",
      },
    },
  },
});

export default theme;
