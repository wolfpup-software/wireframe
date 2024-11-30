use coyote::Component::None;
use coyote::{attr_val, tmpl, Component};

use components::document::{bare_minimum_metas, document_frame};

const title: &str = "Home";
const description: &str = "A list of wireframe components";

pub fn page() -> Component {
    document_frame(
        None,
        bare_minimum_metas(title, description), // meta
        None,                                   // styles
        None,                                   // scripts
        body(),                                 // body
    )
}

fn body() -> Component {
    tmpl(
        "
        <header>
        </header>
        <main>
            <p>hai :3</p>
        </main>
        <footer></footer>
        ",
        [],
    )
}
