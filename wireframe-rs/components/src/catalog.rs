// body of a catalog document

use coyote::{attr_val, list, text, tmpl, vlist, Component};

// need to show disabled state

const COMPONENTS: [&'static [&'static str; 3]; 1] =
    [&["checkbox", "initial", "checkboxes are a skeumorph"]];

// creates an <input> section
pub fn create_input_component(attrs: Component) -> Component {
    tmpl(
        "
			<input {}>
		",
        [attrs],
    )
}

pub fn create_component_chonk(
    title: Component,
    description: Component,
    component: Component,
) -> Component {
    tmpl(
        "
			<h3>{}</h3>
			<p>{}</p>
			<figure>
				{}
			</figure>
		",
        [title, description, component],
    )
}

pub fn component_catalog() -> Component {
    let articles = Vec::new();

    tmpl("{}", [vlist(articles)])
}
