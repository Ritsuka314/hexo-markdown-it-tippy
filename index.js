'use strict';

if (typeof hexo !== 'undefined') {
    // if called by hexo
    // put js & css assets into ./public

    const fs = require('hexo-fs');

    let config = hexo.config.tippy;

    let assets = [];

    const format = require('util').format;
    let theme_name = config.theme_name;
    theme_name = theme_name ? theme_name : '';

    // generate js script
    assets.push({
        path: 'js/attachTooltips.js',
        data: format(
            fs.readFileSync(__dirname+'/attachTooltips.js'),
            theme_name
        )
    });

    // generate css
    if (config instanceof Object && typeof config.theme_file !== 'undefined')
        assets.push({
            path: 'css/tippy.css',
            data: function(){
                return fs.createReadStream(config.theme_file);
            }});

    // generate js & css
    hexo.extend.generator.register('tippy', function(){ return assets; });

    // Add js/css resources to each post
    hexo.extend.filter.register('after_post_render', function(data) {
        data.content =
            "<script src='https://unpkg.com/tippy.js@2.0.2/dist/tippy.all.min.js'></script>\n" +
            "<script src='/js/attachTooltips.js'></script>\n" +
            "<link rel='stylesheet' href='/css/tippy.css'>\n" +
            data.content;

        return data;
    });
}
else {
    // if called by markdown-it

    let render_tooltip_open = function (tokens, idx/*, options, env, slf*/) {
        return "<div " +
            "class='tippy-tooltip' " +
            "id='tooltip" + (tokens[idx].meta.id + 1) + "' " +
            "style=\"display: none\">\n";
    };

    let render_tooltip_close = function (tokens, idx/*, options, env, slf*/) {
        return "</div>\n";
    };

    module.exports = function (md, options) {

        md.renderer.rules.tooltip_open     = render_tooltip_open;
        md.renderer.rules.tooltip_close    = render_tooltip_close;

        function tooltips (state) {

            const cloneDeep = require('lodash').cloneDeep;

            let insideFootnoteBlock = false;

            // copy all footnote def's
            state.tokens.forEach(function(tok) {
                if (tok.type === 'footnote_block_open') {
                    insideFootnoteBlock = true;
                }
                else if (tok.type === 'footnote_block_close') {
                    insideFootnoteBlock = false;
                }
                else {
                    if (insideFootnoteBlock && tok.type !== 'footnote_anchor') {
                        // copy all tokens in footnote block except anchors
                        tok = cloneDeep(tok);
                        if (tok.type === 'footnote_open') {
                            tok.type = 'tooltip_open';
                        }
                        else if (tok.type === 'footnote_close') {
                            tok.type = 'tooltip_close';
                        }
                        state.tokens.push(tok);
                    }
                }
            });
        }

        md.core.ruler.after('footnote_tail', 'tooltips', tooltips);
    };
}
