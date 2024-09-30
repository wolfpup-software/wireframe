use coyote::{attr_val, text, tmpl, Component};

pub fn document_frame(
    language: Component,
    metas: Component,
    styles: Component,
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
        [language, metas, styles, scripts, content],
    )
}

pub fn template(attrs: Component, shadow_dom: Component, light_dom: Component) -> Component {
    tmpl(
        "
        <template {}>
            {}
            {}
        </template>",
        [attrs, shadow_dom, light_dom],
    )
}

pub fn lang() -> Component {
    attr_val("lang", "en-us")
}

pub fn metas(title: &str, description: &str) -> Component {
    tmpl(
        "
        <meta charset=utf-8>
        <meta {}>
        <meta {}>
        <meta name=viewport content=\"width=device-width, initial-scale=1\">
        ",
        [attr_val("title", title), attr_val("description", description)],
    )
}
