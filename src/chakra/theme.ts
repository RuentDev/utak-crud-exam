import { ThemeConfig, extendTheme, ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const ContainerStyle = {
  // style object for base or default style
  baseStyle: {
    maxWidth: "100%",
    borderWidth: 1,
    padding: 2,
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
}


const breakpoints = {
  base: '0px',
  sm: '400px',
  md: '1000px',
  lg: '1200px',
  xl: '1280px',
  '2xl': '1920px',
}

const theme = extendTheme({ config },{
  components: {
    Container: ContainerStyle,
  },
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  breakpoints,
  colors: {
    brand: {
      100: "#2C3E61",
    },
  },
  styles: {
    global: () => {
     
    }
  },
})

export default theme;