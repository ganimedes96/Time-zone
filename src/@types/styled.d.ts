import 'styled-components'
import { themeDefault } from '../styles/themes/default'

type ThemeType =  typeof themeDefault;

declare module 'styled-components'{
    export interface DefaultTheme extends ThemeType {}
}