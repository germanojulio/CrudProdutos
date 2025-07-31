import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    brand: {
      50: "#e0f7ff",
      100: "#b3eaff",
      200: "#80dcff",
      300: "#4dceff",
      400: "#1ac0ff",
      500: "#00a7e6",
      600: "#007fb4",
      700: "#005782",
      800: "#002f51",
      900: "#000821",
    },
  },
  fonts: {
    heading: "'Segoe UI', sans-serif",
    body: "'Segoe UI', sans-serif"
  },
})

export default theme