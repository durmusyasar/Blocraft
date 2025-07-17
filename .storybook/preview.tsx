import type { Preview } from '@storybook/react'
import React from 'react';
import enTexts from '../src/stories/i18n/i18n/en.json';
import trTexts from '../src/stories/i18n/i18n/tr.json';
import { DocsContainer } from "@storybook/addon-docs/blocks";

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇬🇧', title: 'English' },
        { value: 'tr', right: '🇹🇷', title: 'Türkçe' },
      ],
    },
  },
};

const I18N_MAP = {
  BcTextField: { en: enTexts, tr: trTexts },
  // Diğer componentler için buraya ekleme yapılacak
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: (props: any) => {
        const locale = props?.context?.globals?.locale || props?.context?.store?.userGlobals?.globals?.locale || 'en';
        const kind = props?.context?.kind || '';
        const componentName = kind.split('/').pop();
        const texts = I18N_MAP[componentName]?.[locale] || I18N_MAP[componentName]?.en || {};
        return (
          <DocsContainer context={props.context}>
            <div style={{ marginBottom: 16 }}>
              <h1>{texts.componentTitle || componentName}</h1>
              <div>{texts.componentDescription || ''}</div>
            </div>  
            {props.children}
          </DocsContainer>
        );
      },
    },
  },
};

export default preview;