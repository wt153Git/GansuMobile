module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', 'prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
		'generator-star-spacing': 'off',
		'no-tabs': 'off',
		'no-unused-vars': 'off',
		'no-irregular-whitespace': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
}
