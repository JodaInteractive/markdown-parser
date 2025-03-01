import { marked } from 'marked';

marked.use({
	async: true,
	pedantic: false,
	gfm: true,
	breaks: false,
});

export type Output = {
	frontmatter: FrontMatter;
	html: string;
};

type FrontMatter = {
	[key: string]: string;
};

const frontmatterRegex = RegExp(/---\n([\s\S]*?)\n---/);
const parseFrontmatter = (content: string): FrontMatter => {
	const match = frontmatterRegex.exec(content);
	if (!match) return {};

	return JSON.parse(match[1] ?? '{}') as FrontMatter;
};

export const parse = async (content: string): Promise<Output> => {
	const frontmatter = parseFrontmatter(content);
	const html = await marked.parse(content);
	return {
		frontmatter,
		html,
	};
};
