import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";

const linkLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    surface: "#FFFFFF",
    primary: "#032b3a",
    secondary: "#027eb5",
    error: "#E94A4D",
    info: "#2196F3",
    success: "#10c54e",
  },
};

const vuetify = createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: "linkLightTheme",
    themes: {
      linkLightTheme,
    },
  },
  aliases: {
    VDataTableServerPrimary: components.VDataTableServer,
    VDateInput,
    VTimePicker,
  },
  locale: {
    locale: "es",
  },
  components,
  directives,
});

export default vuetify;
