use coyote::{attr_val, text, tmpl, Component};

pub fn document_frame(
    language: Component,
    metas: Component,
    style_component: Component,
    scripts: Component,
    content: Component,
) -> Component {
    tmpl(
        "
        <!DOCTYPE html>
        <html {}>
            <head>
                {}
                {}
                {}
            </head>
            <body>
                {}
            </body>
        </html>",
        [language, metas, style_component, scripts, content],
    )
}

pub fn bare_minimum_metas(title: &str, description: &str) -> Component {
    tmpl(
        "
        <meta charset=utf-8>
        <meta {}>
        <meta {}>
        <meta name=viewport content=\"width=device-width, initial-scale=1\">
        ",
        [
            attr_val("title", title),
            attr_val("description", description),
        ],
    )
}
