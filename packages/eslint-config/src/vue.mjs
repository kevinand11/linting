import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from '@vue/eslint-config-typescript'
import vuePlugin from 'eslint-plugin-vue'

import base from './base.mjs'
import { addIgnores } from './utils.mjs'

const vueFiles = ['*.vue', '**/*.vue']

/** @type {import('eslint').Linter.Config[]} */
const configs = [
	...base,
	...defineConfigWithVueTs(vuePlugin.configs['flat/recommended'], vueTsConfigs.recommended).map((config) => ({ ...config, files: [...(config.files ?? []), ...vueFiles] })),
	{
		files: vueFiles,
		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/no-mutating-props': 'off',
			'vue/no-v-html': 'off',
			'vue/no-v-text-v-html-on-component': 'off',
			'vue/attribute-hyphenation': ['error', 'never'],
			'vue/v-on-event-hyphenation': ['error', 'never'],
			'vue/no-useless-v-bind': ['error'],
			'vue/html-indent': [
				'error',
				'tab',
				{
					attribute: 1,
					baseIndent: 1,
					closeBracket: 0,
					alignAttributesVertically: true,
					ignores: [],
				},
			],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{
					registeredComponentsOnly: false,
					ignores: ['math-field', 'metainfo', 'router-link', 'router-view', 'transition'],
				},
			],
		},
	}
]

export default [
	...base,
	...configs.map(addIgnores),
]