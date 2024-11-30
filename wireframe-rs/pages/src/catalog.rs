use coyote::Component::None;
use coyote::{attr_val, list, tmpl, Component};

use components::document::{document_frame, lang, metas};

const title: &str = "Home";
const description: &str = "A list of wireframe components";

// styles
// baseboard
// inputs

const components: &[&str] = [
    "button",
    "checkbox",
    "chip",
    "radio",
    "switch",
    "toggle"
];

pub fn page() -> Component {
    let styles = tmpl(
        "
        
        ",
        []
    );
    document_frame(
        lang(),
        metas(title, description), // meta
        None,                      // styles
        None,                      // scripts
        body(),                    // body
    )
}

fn body() -> Component {
    // go though list of components
    tmpl(
        "
        <header>
            <h1>Component Catalog</h1>
        </header>
        <main>
            
        </main>
        <footer></footer>
        ",
        [],
    )
}
