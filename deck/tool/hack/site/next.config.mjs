/** @type {import('next').NextConfig} */
import createMDXPlugin from '@next/mdx'
import withYaml from 'next-plugin-yaml'
import path from 'path'
import { fileURLToPath } from 'url'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'
import rehypeSlug from 'rehype-slug'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mdxConfig = {
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    rehypePlugins: [[rehypeSlug], [rehypeKatex]], //, [rehypeAutolinkHeadings]],
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [[remarkPrism], [remarkMath], [remarkGfm]],
  },
}

const withMDX = createMDXPlugin(mdxConfig)

const nextConfig = withBundleAnalyzer(
  withYaml(
    withMDX({
      serverRuntimeConfig: {
        PROJECT_BASE: __dirname,
      },
      images: {
        domains: ['base.link'],
      },
      pageExtensions: ['mdx', 'md', 'tsx', 'ts'],
      poweredByHeader: false,
      // reactStrictMode: true,
      trailingSlash: false,
      webpack: config => {
        config.resolve = {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            next: path.resolve(__dirname, './node_modules/next'),
            react: path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(
              __dirname,
              './node_modules/react-dom',
            ),
            'styled-components': path.resolve(
              __dirname,
              './node_modules/styled-components',
            ),
          },
          extensions: ['.ts', '.tsx', '.js', '.json'],
        }

        config.module.rules.push({
          test: /\.(glsl|vs|fs|vert|frag)$/,
          type: 'asset/source',
        })

        config.module.rules.push({
          test: /\.txt$/,
          loader: 'raw-loader',
        })

        return config
      },
    }),
  ),
)

export default nextConfig
