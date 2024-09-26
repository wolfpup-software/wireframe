use coyote::Component::None;
use coyote::{attr_val, tmpl, Component};

use components::document::{document_frame, lang, metas};

const title: &str = "Home";
const description: &str = "A list of wireframe components";

pub fn page() -> Component {
    document_frame(
        lang(),
        metas(title, description), // meta
        None,                      // styles
        None,                      // scripts
        body(),                    // body
    )
}

fn body() -> Component {
    tmpl(
        "
        <header>
        </header>
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
