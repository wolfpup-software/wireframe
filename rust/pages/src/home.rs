use coyote::Component::None;
use coyote::{attr_val, tmpl, Component};

use crate::document::document_frame;

// intro to the wireframe components
// should demo all the components quickly
// links to catalog page

fn body() -> Component {
    tmpl(
        "
        <header></header>
        <main>
            <p>hai :3</p>
            <nav>
                <ol>
                    <li><a href=/checkbox>checkbox</a></li>
                </ol>
            </nav>
        </main>
        <footer></footer>
        ",
        [],
    )
}

pub fn page() -> Component {
    document_frame(
        attr_val("lang", "en-us"),
        None,   // meta
        None,   // styles
        None,   // scripts
        body(), // body
    )
}
