import type { Preview } from '@storybook/react-vite';
import '../src/index.css';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#110d1f' },
        light: { name: 'Light', value: '#ffffff' },
      }
    }
  },
    initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: { value: 'dark' },
  },
};

export default preview;
