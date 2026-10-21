/**
 * Remark plugin: turn `youtube: VIDEO_ID` inline code into an embedded player.
 *
 * Replaces gatsby-remark-embed-video, whose syntax the migrated blog posts still
 * use. Matches the old site's options: youtube-nocookie.com, no related videos
 * from other channels (rel=0), no iframe border, 800px max width. A paragraph
 * containing only the code becomes the embed; anywhere else it is left as code.
 *
 * Builds hast via mdast `data.hName`/`hChildren` rather than a raw `html` node,
 * which MDX would drop.
 */
const YOUTUBE = /^youtube:\s*(?:https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/))?([\w-]{11})\S*$/;

const embed = (videoId) => ({
  type: 'paragraph',
  children: [],
  data: {
    hName: 'div',
    hProperties: { className: ['video-embed'] },
    hChildren: [
      {
        type: 'element',
        tagName: 'iframe',
        properties: {
          src: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`,
          title: 'YouTube video player',
          loading: 'lazy',
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          referrerPolicy: 'strict-origin-when-cross-origin',
          allowFullScreen: true,
          style: 'display:block;width:100%;max-width:800px;aspect-ratio:16/9;height:auto;border:0;',
        },
        children: [],
      },
    ],
  },
});

export default function remarkEmbedVideo() {
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (
        child.type === 'paragraph' &&
        child.children.length === 1 &&
        child.children[0].type === 'inlineCode'
      ) {
        const match = child.children[0].value.trim().match(YOUTUBE);
        if (match) return embed(match[1]);
      }
      walk(child);
      return child;
    });
  };
  return walk;
}
