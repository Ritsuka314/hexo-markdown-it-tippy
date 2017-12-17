# hexo_tippy

A hexo plugin to add tooltips to your blog posts using [tippy](https://atomiks.github.io/tippyjs/).

This plugin differs from other similar ones by
allowing full [pandoc footnote definition](http://pandoc.org/MANUAL.html#footnotes),
e.g.,

* allowing footnote identifiers other than just numbers (e.g., [^footnote])
* allowing  rich text in footnote

## Getting Started

### Prerequisites

Current version (0.1.0) works with the following packages.
Newer/older versions may be compatible, but there is no test to guarantee that.
* [tippy.js](https://atomiks.github.io/tippyjs/): 2.0.2
* [hexo-fs](https://github.com/hexojs/hexo-fs): 0.2.2
* [lodash](https://lodash.com/): 4.17.4

If you installed this package as described in [Getting Started](#Getting Started),
npm should have automaticlly installed the above packages for you.

Further more, this plugin also requires:
* [hexo](https://hexo.io/): 3.4.3
*   either [hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus): 1.0.2 (recommended)

    or [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it): 3.4.1 (not tested, although technically possibly compatible)
* [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote): 3.0.1

You have to install the above packages yourself.

### Installing

Assuming you have hexo working, otherwise see [hexo installation](https://hexo.io/docs/#Installation):

Execute under root directory of your hexo blog:
```
npm install markdown-it-footnote --save
```

Add to your `./_config.yml` file:
```
markdown_it_plus:
  # other options
  plugins:
    # other plugins
    - plugin:
        name: markdown-it-footnote
        enable: true
    - plugin:
        name: hexo-tippy
        enable: true
```

Also (Optionally) add to your `./_config.yml` file, if you want customized theme.
```
tippy:
  theme_file: tippy-theme.css   # css file containing the theme, relative to blog root directory
  theme_name: honeybee          # theme name, see tippy docs
```

See tippy's instruction on [creating themes](https://atomiks.github.io/tippyjs/#creating-themes)

The above steps only need to be done once.
After that,
run `hexo` to generate your blog and see the tooltips in effect.

## Contributing

This project starts off as a personal tool for my own blog,
and thus is written with no consideration of any other user.
Despite being functioning, the project is still very incomplete.

Also yet being a personal project, I would very happy if someone is interesting in
using, or even improving it. Thus issue/pull request are greatly welcomed.

However, please bear in mind that, being yet a personal project,
this plugin may not be stable during use, and I may not be able
to accept pull requests, whether due to personal energy or taste.

## Versioning

The project is first published under the version 0.1.0.
As improvements being made, I will keep incrementing the MINOR and PATCH verion,
depending on the actual changes.

I will not increment the MAJOR version to `1` until the project
becomes satisfactory and ready to face massive users.

## Authors

* [**Richard Yan**](https://github.com/RichardYan314)

## License

This project is licensed under the
GNU General Public License v3.0
license.

See the [LICENSE.md](LICENSE.md) file for the full text.

## Acknowledgments

* HEXO
* markdown-it
