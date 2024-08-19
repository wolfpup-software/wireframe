use coyote::Component::None;
use coyote::{attr_val, tmpl, unescaped_text, Component};

use crate::document::document_frame;

pub fn design_system_bar() -> Component {
    tmpl(
        "
        <form>
			<label><input type=color></input>color0</label>
		</form>
        ",
        [],
    )
}

pub fn css() -> Component {
    unescaped_text(
        "
        main {
            display: flex;
            direction: row;
        }
        ".to_string(),
    )
}

// stage
// design system as css custom properies

