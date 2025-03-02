import { marked } from 'marked';
const useSpy = jest.spyOn(marked, 'use');

import { parse } from './index.js';

const originalContent = '# Test\n\nThis is a test';
const original = `'---\n{"title": "Test", "summary": "This is a test"}\n---\n${originalContent}`;

const parsedFrontmatter = {
	title: 'Test',
	summary: 'This is a test',
};
const parsedContent = '<h1>Test</h1>\n<p>This is a test</p>\n';

describe('markdown-parser', () => {
	it('should configure marked', async () => {
		expect(useSpy).toHaveBeenCalledWith({
			async: true,
			pedantic: false,
			gfm: true,
			breaks: false,
		});
	});

	it('should parse markdown', async () => {
		const spy = jest.spyOn(marked, 'parse');
		const output = await parse(original);
		expect(spy).toHaveBeenCalledWith(originalContent);
		expect(output.html).toEqual(parsedContent);
	});

	it('should parse frontmatter', async () => {
		const output = await parse(original);
		expect(output.frontmatter).toStrictEqual(parsedFrontmatter);
	});
});
