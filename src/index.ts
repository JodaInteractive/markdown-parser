import { marked } from 'marked';

marked.use({
	async: true,
	pedantic: false,
	gfm: true,
	breaks: false,
});

export type ParsedOutput<
	T = {
		[key: string]: string;
	},
> = {
	frontmatter: T;
	html: string;
};

export async function parse<T>(content: string): Promise<ParsedOutput<T>> {
	const matches = RegExp(/---\n([\s\S]*?)\n---\n([\s\S]*?)$/).exec(content)!;
	return {
		frontmatter: JSON.parse(matches[1]),
		html: await marked.parse(matches[2]),
	};
}
